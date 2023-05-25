using Microsoft.AspNetCore.Mvc;
using zeitag_grid_init.Application.TimeTable.CreateTimeTracking;
using zeitag_grid_init.WebUI.Controllers;

namespace WebUI.Controllers;
public class TimeTrackingController : ApiControllerBase
{
    // Senden des Commands für das Erstellen einer Zeiterfassung
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateTimeTrackingCommand command)
    {
        return await Mediator.Send(command);
    }
}
