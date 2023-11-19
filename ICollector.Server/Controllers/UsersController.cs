using ICollector.Server.Extensions;
using ICollector.Server.Models;
using ICollector.Server.Models.ApiModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Controllers;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "admin")]
public class UsersController : Controller
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<AppRole> _roleManager;

    public UsersController(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpGet]
    public async Task<ActionResult<UserResponse[]>> GetUsers(int page = 1, int pageSize = 100)
    {
        var users = await _userManager.Users
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => u.ToApiResponse())
            .ToArrayAsync();

        foreach (var u in users)
        {
            var roles = await _userManager.GetRolesAsync(new() { Id = u.Id });
            u.Roles = roles.ToArray();
        }

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponse[]>> GetUser(string Id)
    {
        var user = await _userManager.FindByIdAsync(Id);

        if (user == null)
        {
            return NotFound();
        }

        var response = user.ToApiResponse();
        var roles = await _userManager.GetRolesAsync(user);
        response.Roles = roles.ToArray();

        return Ok(response);
    }

    [HttpGet]
    [Route(nameof(BlockUser))]
    public async Task<IActionResult> BlockUser(string userId, DateTime? blockUntil)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return NotFound();
        }

        await _userManager.SetLockoutEndDateAsync(user, blockUntil ?? DateTime.MaxValue);
        return Ok();
    }

    [HttpGet]
    [Route(nameof(UnblockUser))]
    public async Task<IActionResult> UnblockUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return NotFound();
        }

        await _userManager.SetLockoutEndDateAsync(user, null);
        return Ok();
    }

    [HttpGet]
    [Route(nameof(AddUserToRole))]
    public async Task<IActionResult> AddUserToRole(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        var role = await _roleManager.FindByNameAsync(roleName);

        if (user == null || role == null)
        {
            return NotFound();
        }

        await _userManager.AddToRoleAsync(user, roleName);
        return Ok();
    }

    [HttpGet]
    [Route(nameof(RemoveUserFromRole))]
    public async Task<IActionResult> RemoveUserFromRole(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        var role = await _roleManager.FindByNameAsync(roleName);

        if (user == null || role == null)
        {
            return NotFound();
        }

        await _userManager.RemoveFromRoleAsync(user, roleName);
        return Ok();
    }
}
