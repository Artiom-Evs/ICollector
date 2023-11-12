using ICollector.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<UserCollection> Collections { get; set; }
    public DbSet<CollectionItem> Items { get; set; }
}
