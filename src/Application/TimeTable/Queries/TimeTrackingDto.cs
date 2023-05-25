using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using zeitag_grid_init.Application.Common.Mappings;
using zeitag_grid_init.Domain.Entities;
using zeitag_grid_init.Domain.Enums;

namespace zeitag_grid_init.Application.TimeTable.Queries;
public class TimeTrackingDto : IMapFrom<TimeTracking>
{
    public int Id { get; set; }
    public DateTime StartOfRecord { get; set; }
    public DateTime EndOfRecord { get; set; }
    public string? ShortDescription { get; set; }
    public BookingType Type { get; set; }
}
