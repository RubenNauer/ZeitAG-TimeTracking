using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using zeitag_grid_init.Application.Common.Interfaces;

namespace zeitag_grid_init.Application.TimeTable.CreateTimeTracking;
public class CreateTimeTrackingCommandValidator : AbstractValidator<CreateTimeTrackingCommand>
{
    private readonly IApplicationDbContext _context;
    public CreateTimeTrackingCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        // Je nach Anforderungen können hier Validierungen getätigt werden
    }
}
