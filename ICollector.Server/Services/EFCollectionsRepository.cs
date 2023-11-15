using ICollector.Server.Data;
using ICollector.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Services;

public class EFCollectionsRepository : EFDataRepository<UserCollection>
{
    public EFCollectionsRepository(ApplicationDbContext context) : base(context)
    {
    }

    public override IQueryable<UserCollection> Query() => _context.Set<UserCollection>()
        .Include(c => c.Items);
}
