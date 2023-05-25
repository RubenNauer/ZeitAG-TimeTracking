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

  ngOnInit(): void {
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
}
