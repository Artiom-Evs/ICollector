using Azure.Core;
using ICollector.Server.Extensions;
using ICollector.Server.Models;
using ICollector.Server.Models.ApiModels;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CollectionsController : ControllerBase
{
    private readonly IDataRepository<UserCollection> _context;
    private readonly UserManager<AppUser> _userManager;

    public CollectionsController(IDataRepository<UserCollection> context, UserManager<AppUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CollectionResponse>>> GetUserCollections(string authorId = "", string orderBy = "", bool descending = false, int page = 1, int pageSize = 0)
    {
        var items = _context.Query();

        if (!string.IsNullOrWhiteSpace(authorId))
        {
            items = items.Where(i => i.AuthorId == authorId);
        }

        items = orderBy.ToLower() switch
        {
            "id" => items.OrderByWithDescending(i => i.Id, descending),
            "name" => items.OrderByWithDescending(i => i.Name, descending),
            "created" => items.OrderByWithDescending(i => i.Created, descending),
            "edited" => items.OrderByWithDescending(i => i.Edited, descending),
            "itemscount" => items.OrderByWithDescending(i => i.Items.Count, descending),
            _ => items
        };

        if (pageSize != 0)
        {
            items = items
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        var responseItems = await items
            .Select(i => i.ToApiResponse())
            .ToArrayAsync();

        var authorIds = responseItems.Select(i => i.AuthorId).ToArray();
        var authors = await _userManager.Users
            .Where(u => authorIds.Contains(u.Id))
            .Select(u => new { u.Id, u.UserName })
            .ToArrayAsync();

        foreach (var item in responseItems)
        {
            // TODO: determine the correct behavior in a situation when the author does not exist
            item.AuthorName = authors.FirstOrDefault(a => a.Id == item.AuthorId)?.UserName ?? "unknown";
            item.Items.ForEach(i => i.Collection = null);
        }

        return Ok(responseItems);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CollectionResponse>> GetUserCollection(int id)
    {
        var userCollection = await _context.Query().FirstOrDefaultAsync(item => item.Id == id);

        if (userCollection == null)
        {
            return NotFound();
        }

        var responseItem = userCollection.ToApiResponse();
        responseItem.Items.ForEach(i => i.Collection = null);

        // TODO: determine the correct behavior in a situation when the author does not exist
        var user = await _userManager.FindByIdAsync( responseItem.AuthorId);
        responseItem.AuthorName = user?.UserName ?? "unknown";

        return Ok(responseItem);
    }

    [HttpPost]
    public async Task<ActionResult<CollectionResponse>> PostUserCollection(CollectionRequest request)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        UserCollection newCollection = request.ToDomainModel();

        newCollection.AuthorId = user.Id;
        newCollection.Created = newCollection.Edited = DateTime.Now;

        var createdCollection = await _context.CreateAsync(newCollection);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserCollection), new { createdCollection.Id }, createdCollection);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUserCollection(int id, CollectionRequest request)
    {
        if (id != request.Id)
        {
            return BadRequest();
        }

        var storedCollection = await _context.GetAsync(item => item.Id == request.Id);

        if (storedCollection == null)
        {
            return BadRequest();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (storedCollection.AuthorId != user.Id && !this.User.IsInRole("admin"))
        {
            return Forbid();
        }

        // TODO: analyze the difference between change tracking and copying data to a new object
        var updatedCollection = request.ToDomainModel();

        updatedCollection.AuthorId = storedCollection.AuthorId;
        updatedCollection.Created = storedCollection.Created;
        updatedCollection.Edited = DateTime.Now;

        await _context.UpdateAsync(updatedCollection);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserCollection(int id)
    {
        var userCollection = await _context.GetAsync(item => item.Id == id);

        if (userCollection == null)
        {
            return NotFound();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (userCollection.AuthorId != user.Id && !this.User.IsInRole("admin"))
        {
            return Forbid();
        }

        await _context.DeleteAsync(item => item.Id == id);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
