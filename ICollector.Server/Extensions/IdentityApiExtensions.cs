using ICollector.Server.Models;
using ICollector.Server.Models.ApiModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace ICollector.Server.Extensions;

public static class IdentityApiExtensions
{
    public static IEndpointRouteBuilder MapCustomIdentityApi(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("detailedInfo", HandleGetDetailedInfo).RequireAuthorization();
        
        return endpoints;
    }

    private static async Task<Results<Ok<DetailedInfoResponse>, UnauthorizedHttpResult>> HandleGetDetailedInfo(HttpContext context, UserManager<AppUser> userManager)
    {
        var user = await userManager.GetUserAsync(context.User);

        if (user == null)
        {
            return TypedResults.Unauthorized();
        }

        var roles = await userManager.GetRolesAsync(user);
        
        return TypedResults.Ok(new DetailedInfoResponse()
        {
            Id = user.Id,
            Email = user.Email ?? "",
            IsConfirmedEmail = user.EmailConfirmed,
            Roles = roles.ToArray()
        });
    }
}
