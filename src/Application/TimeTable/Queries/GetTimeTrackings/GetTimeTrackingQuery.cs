using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using zeitag_grid_init.Application.Common.Interfaces;
using zeitag_grid_init.Application.Common.Models;
using zeitag_grid_init.Application.TodoItems.Queries.GetTodoItemsWithPagination;

namespace zeitag_grid_init.Application.TimeTable.Queries.GetTimeTrackings;
public class GetTimeTrackingQuery : IRequest<List<TimeTrackingDto>>
{
    public DateTime RequestedDate { get; set; }
}

public class GetTimeTrackingQueryHandler : IRequestHandler<GetTimeTrackingQuery, List<TimeTrackingDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTimeTrackingQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<TimeTrackingDto>> Handle(GetTimeTrackingQuery request, CancellationToken cancellationToken)
    {
        return await _context.TimeTrackings
            .Where(x => x.StartOfRecord.Date == request.RequestedDate.Date)
            .OrderBy(x => x.StartOfRecord)
            .ProjectTo<TimeTrackingDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        
    }
}
