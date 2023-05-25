using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zeitag_grid_init.Domain.Entities;
public class TimeTracking : BaseEntity
{
    // Ich habe das Modell geändert:
    // Aus meiner Sicht reicht es eine Referenz zu einem Enum zu erstellen und es benötigt nicht extra eine BookingTypes Tabelle/Klasse. 
    public DateTime StartOfRecord { get; set; }
    public DateTime EndOfRecord { get; set; }
    public string? ShortDescription { get; set; }
    public BookingType Type { get; set; }
}
