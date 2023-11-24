using ICollector.Server.Data;
using ICollector.Server.Extensions;
using ICollector.Server.Hubs;
using ICollector.Server.Models;
using ICollector.Server.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppIdentityDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("mssql")
        ?? throw new InvalidOperationException("Connection string not found.")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("mssql")
        ?? throw new InvalidOperationException("Connection string not found.")));

builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddRoles<AppRole>()
    .AddEntityFrameworkStores<AppIdentityDbContext>();

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddSignalR();

builder.Services.AddScoped<IDataRepository<UserCollection>, EFCollectionsRepository>();
builder.Services.AddScoped<IDataRepository<CollectionItem>, EFItemsRepository>();
builder.Services.AddScoped<IDataRepository<ItemComment>, EFDataRepository<ItemComment>>();
builder.Services.AddScoped<ISearchService, EFSearchService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.SeedRolesData()
       .SeedUsersData()
       .SeedCollectionsData();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("/api/identity").MapIdentityApi<AppUser>();
app.MapGroup("/api/identity/manage").MapCustomIdentityApi();
app.MapFallbackToFile("/index.html");
app.MapControllers();
app.MapHub<CommentNotificationsHub>("/_hubs/comments");

app.Run();
