using ICollector.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        // TODO: analyze the difference between change tracking and copying data to a new object
        this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }

    public DbSet<UserCollection> Collections { get; set; }
    public DbSet<CollectionItem> Items { get; set; }
    public DbSet<ItemComment> ItemComments { get; set; }
}
