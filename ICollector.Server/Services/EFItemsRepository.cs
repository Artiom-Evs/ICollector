using ICollector.Server.Data;
using ICollector.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Services;

public class EFItemsRepository : EFDataRepository<CollectionItem>
{
    public EFItemsRepository(ApplicationDbContext context) : base(context)
    {
    }

    public override IQueryable<CollectionItem> Query() => _context.Set<CollectionItem>()
        .Include(i => i.Collection);
}
