using ICollector.Server.Data;
using ICollector.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Services;

public class EFItemCommentsRepository : EFDataRepository<ItemComment>
{
    public EFItemCommentsRepository(ApplicationDbContext context) : base(context)
    {
    }

    public override IQueryable<ItemComment> Query() => _context.Set<ItemComment>()
        .Include(c => c.Item);
}
