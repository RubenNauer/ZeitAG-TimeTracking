using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zeitag_grid_init.Domain.Enums;
public enum BookingType
{
    // Namen auf Englisch, im Frontend werden diese in Deutsch übersetzt
    PresenceTime = 0,
    Break = 1,
    IllnessOrAccident = 2,
    PaidAbsence = 3,
    UnpaidAbsence = 4
}
