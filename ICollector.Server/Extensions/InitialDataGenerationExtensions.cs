using ICollector.Server.Models;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Identity;
using System;

namespace ICollector.Server.Extensions;

file record User(string Email, string Password, string[]? Roles);

public static class InitialDataGenerationExtensions
{
    public static WebApplication SeedRolesData(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        using var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
        var roles = app.Configuration
            .GetSection("InitialData:Roles")
            .Get<string[]>()
                ?? throw new InvalidOperationException("Roles initial data not found in application configuration.");

        foreach (var role in roles)
        {
            if (roleManager.FindByNameAsync(role).Result == null)
            {
                roleManager.CreateAsync(new AppRole { Name = role }).Wait();
            }
        }

        return app;
    }

    public static WebApplication SeedUsersData(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        using var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        using var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
        var users = app.Configuration
            .GetSection("InitialData:Users")
            .Get<User[]>()
                ?? throw new InvalidOperationException("Users initial data not found in application configuration.");

        foreach (var user in users)
        {
            if (userManager.FindByNameAsync(user.Email).Result == null)
            {
                AppUser newUser = new() { Email = user.Email, UserName = user.Email };
                userManager.CreateAsync(newUser, user.Password).Wait();
                if (user.Roles != null)
                    userManager.AddToRolesAsync(newUser, user.Roles).Wait();
            }
        }

        return app;
    }

    public static WebApplication SeedCollectionsData(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        using var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        var appDbContext = scope.ServiceProvider.GetRequiredService<IDataRepository<UserCollection>>();
        var users = app.Configuration
            .GetSection("InitialData:Users")
            .Get<User[]>()
                ?? throw new InvalidOperationException("Users initial data not found in application configuration.");
        var collections = app.Configuration
            .GetSection("InitialData:Collections")
            .Get<UserCollection[]>()
                ?? throw new InvalidOperationException("User collections initial data not found in application configuration.");

        foreach (var collection in collections.Take(2))
        {
            if (!appDbContext.AnyAsync(c => c.Name == collection.Name).Result)
            {
                collection.AuthorId = userManager.FindByNameAsync(users[0].Email).Result?.Id
                    ?? throw new InvalidOperationException();
                appDbContext.CreateAsync(collection).Wait();
            }
        }

        foreach (var collection in collections.Skip(2))
        {
            if (!appDbContext.AnyAsync(c => c.Name == collection.Name).Result)
            {
                collection.AuthorId = userManager.FindByEmailAsync(users[1].Email).Result?.Id
                    ?? throw new InvalidOperationException();
                appDbContext.CreateAsync(collection).Wait();
            }
        }

        appDbContext.SaveChangesAsync().Wait();

        return app;
    }
}
