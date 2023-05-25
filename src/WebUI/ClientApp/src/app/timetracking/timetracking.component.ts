import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  CreateTimeTrackingCommand, TimeTracking,
  TimeTrackingClient, TimeTrackingDto,
  BookingType
} from '../web-api-client';

@Component({
  selector: 'app-timetracking',
  templateUrl: './timetracking.component.html',
  styleUrls: ['./timetracking.component.css']
})
export class TimetrackingComponent implements OnInit {
  debug = false;
  newTimeTrackingModalRef: BsModalRef;
  newTimeTrackingEditor: any = {};
  timeTrackings: TimeTrackingDto[];
  selectedTimeTracking: TimeTrackingDto;
  selectedBookingType: BookingType;
  selectedDate: Date;
  selectedStartTime: Date;
  selectedEndTime: Date;

  // Für das Dropdown (Select) werden Anzeigenamen festgelegt
  bookingTypes = [
    { value: BookingType.PresenceTime, label: 'Präsenzzeit' },
    { value: BookingType.Break, label: 'Pause' },
    { value: BookingType.IllnessOrAccident, label: 'Krankheit oder Unfall' },
    { value: BookingType.PaidAbsence, label: 'Bezahlte Absenz' },
    { value: BookingType.UnpaidAbsence, label: 'Unbezahlte Absenz' },
  ];


  constructor(
    private timeTrackingClient: TimeTrackingClient,
    private modalService: BsModalService
  ) { }

  // Aufruf beim Initialisieren
  ngOnInit(): void {
    this.selectedDate = new Date();
    this.timeTrackingClient.get(this.selectedDate).subscribe(
      result => {
        this.timeTrackings = result;
      },
      error => console.error(error)
    );
  }
  // Aufruf beim Wechsel einer Value
  onDateChange(): void {
    this.timeTrackingClient.get(this.selectedDate).subscribe(
      result => {
        this.timeTrackings = result;
      },
      error => console.error(error)
    );
  }

  // Methode fürs Anzeigen des Pop-Ups
  showCreateTimeTrackingModal(template: TemplateRef<any>): void {
    this.newTimeTrackingModalRef = this.modalService.show(template);
    setTimeout(() => document.getElementById('title').focus(), 250);

    // "Zwischen-Values" statt direkter Bind von den zwei Werten in newTimeTrackingEditor  (startOfRecord, endOfRecord)
    this.selectedStartTime = new Date(this.selectedDate);
    this.selectedEndTime = new Date(this.selectedDate);
  }

  // Methode fürs Klicken beim Schliessen des Pop-Ups
  newTimeTrackingCancelled(): void {
    this.newTimeTrackingModalRef.hide();
    this.newTimeTrackingEditor = {};
  }

  // Methode nach dem Drücken des Knopfs mit der Aufschrift "+"
  createTimeTracking(): void {
    const timeTracking = {
      id: 0,
      startOfRecord: this.selectedStartTime,
      endOfRecord: this.selectedEndTime,
      shortDescription: this.newTimeTrackingEditor.shortDescription,
      type: parseInt(this.selectedBookingType.toString()),
    } as TimeTrackingDto;

    this.timeTrackingClient.create(timeTracking as CreateTimeTrackingCommand).subscribe(
      result => {
        timeTracking.id = result;
        this.timeTrackings.push(timeTracking);
        this.selectedTimeTracking = timeTracking;
        this.newTimeTrackingModalRef.hide();
        this.newTimeTrackingEditor = {};
      },
      error => {
        const errors = JSON.parse(error.response);

        if (errors && errors.Title) {
          this.newTimeTrackingEditor.error = errors.Title[0];
        }

        setTimeout(() => document.getElementById('title').focus(), 250);
      }
    );
  }

  // Für die Tabelle
  getBookingTypeLabel(type: BookingType): string {
    switch (type) {
      case BookingType.PresenceTime:
        return 'Präsenzzeit';
      case BookingType.Break:
        return 'Pause';
      case BookingType.IllnessOrAccident:
        return 'Krankheit oder Unfall';
      case BookingType.PaidAbsence:
        return 'Bezahlte Absenz';
      case BookingType.UnpaidAbsence:
        return 'Unbezahlte Absenz';
      default:
        return '';
    }
  }

  // Berechnung zwischen Start und Ende
  calculateTime(start: Date, end: Date): string {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const timeDifference = endTime - startTime;

    // Herunterrunden
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);

    const formattedHours = this.padNumber(hours, 2);
    const formattedMinutes = this.padNumber(minutes, 2);

    return `${formattedHours}:${formattedMinutes}`;
  }

  // Auffüllung der Nullen (0) 
  private padNumber(number: number, length: number): string {
    let str = number.toString();
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
}
