using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zeitag_grid_init.Domain.Events;
public class TimeTrackingCreatedEvent : BaseEvent
{
    public TimeTrackingCreatedEvent(TimeTracking timeTracking)
    {
        TimeTracking = timeTracking;
    }

    public TimeTracking TimeTracking { get; }
}
