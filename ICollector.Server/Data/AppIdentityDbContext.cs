using ICollector.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Data;

public class AppIdentityDbContext : IdentityDbContext<AppUser, AppRole, string>
{
    public AppIdentityDbContext(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
        Database.Migrate();
    }
}
