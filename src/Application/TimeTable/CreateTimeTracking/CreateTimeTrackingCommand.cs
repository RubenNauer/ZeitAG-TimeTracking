using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using zeitag_grid_init.Application.Common.Interfaces;
using zeitag_grid_init.Application.TimeTable.Queries;
using zeitag_grid_init.Domain.Entities;
using zeitag_grid_init.Domain.Enums;
using zeitag_grid_init.Domain.Events;

namespace zeitag_grid_init.Application.TimeTable.CreateTimeTracking;
public class CreateTimeTrackingCommand : IRequest<int>
{
    // Relevenate Properties, die mitgesendet werden 
    public DateTime StartOfRecord { get; set; }
    public DateTime EndOfRecord { get; set; }
    public string? ShortDescription { get; set; }
    public BookingType Type { get; set; }

    // temporär für web-api-client.ts Generierung
    public TimeTracking TimeTracking { get; set; }
    public TimeTrackingDto TimeTrackingDto { get; set; }
}

public class CreateTimeTrackingCommandHandler : IRequestHandler<CreateTimeTrackingCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateTimeTrackingCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    // Mitgegebene Werte werden hier zu einem TimeTracking Objekt gemacht und dann in die Db hineingespeichert
    public async Task<int> Handle(CreateTimeTrackingCommand request, CancellationToken cancellationToken)
    {
        var entity = new TimeTracking
        {
            StartOfRecord = request.StartOfRecord,
            EndOfRecord = request.EndOfRecord,
            ShortDescription = request.ShortDescription,
            Type = request.Type
        };

        entity.AddDomainEvent(new TimeTrackingCreatedEvent(entity));

        _context.TimeTrackings.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}

