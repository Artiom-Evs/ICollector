using ICollector.Server.Extensions;
using ICollector.Server.Models;
using ICollector.Server.Models.ApiModels;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ICollector.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ItemsController : ControllerBase
{
    private readonly IDataRepository<UserCollection> _collections;
    private readonly IDataRepository<CollectionItem> _items;
    private readonly IDataRepository<ItemComment> _comments;
    private readonly UserManager<AppUser> _userManager;

    public ItemsController(IDataRepository<UserCollection> collections, IDataRepository<CollectionItem> items, IDataRepository<ItemComment> comments, UserManager<AppUser> userManager)
    {
        _collections = collections;
        _items = items;
        _comments = comments;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemResponse>>> GetItems(string orderBy = "", bool descending = false, int page = 1, int pageSize = 0)
    {
        var items = _items.Query();

        items = orderBy.ToLower() switch
        {
            "id" => items.OrderByWithDescending(i => i.Id, descending),
            "name" => items.OrderByWithDescending(i => i.Name, descending),
            "created" => items.OrderByWithDescending(i => i.Created, descending),
            "edited" => items.OrderByWithDescending(i => i.Edited, descending),
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

        var itemIds = responseItems.Select(ri => ri.Id).ToArray();
        var itemCommentCounts = await _comments.Query()
            .Where(comment => itemIds.Contains(comment.ItemId))
            .GroupBy(comment => comment.ItemId)
            .Select(group => new
            {
                ItemId = group.Key,
                CommentsCount = group.Count()
            })
            .ToArrayAsync();

        var authorIds = responseItems
            .Where(i => i.Collection != null)
            .Select(i => i.Collection?.AuthorId ?? "")
            .ToArray();
        var authors = _userManager.Users
            .Where(u => authorIds.Contains(u.Id))
            .Select(u => new { u.Id, u.UserName })
            .ToArray();

        foreach (var item in responseItems)
        {
            if (item.Collection != null)
            {
                // TODO: determine the correct behavior in a situation when the author does not exist
                item.Collection.AuthorName = authors.FirstOrDefault(a => a.Id == item.Collection.AuthorId)?.UserName ?? "unknown";
                item.CommentsCount = itemCommentCounts.FirstOrDefault(aggr => aggr.ItemId == item.Id)?.CommentsCount ?? 0;
                item.Collection.Items = [];
            }               
        }

        return Ok(responseItems);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ItemResponse>> GetCollectionItem(int id)
    {
        var item = await _items.Query().FirstOrDefaultAsync(item => item.Id == id);

        if (item == null)
        {
            return NotFound();
        }

        var responseItem = item.ToApiResponse();
        responseItem.CommentsCount = await _comments.Query()
            .Where(comment => comment.ItemId == item.Id)
            .CountAsync();

        if (responseItem.Collection != null)
        {
            // TODO: determine the correct behavior in a situation when the author does not exist
            var user = await _userManager.FindByIdAsync(responseItem.Collection.AuthorId);
            responseItem.Collection.AuthorName = user?.UserName ?? "unknown";

            responseItem.Collection.Items = [];
        }

        return Ok(responseItem);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ItemResponse>> PostCollectionItem(ItemRequest request)
    {
        var userCollection = await _collections.GetAsync(item => item.Id == request.CollectionId);

        if (userCollection == null)
        {
            return BadRequest();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (userCollection.AuthorId != user.Id && !this.User.IsInRole("admin"))
        {
            return Forbid();
        }

        var newItem = request.ToDomainModel();
        newItem.Created = newItem.Edited = DateTime.Now;

        var createdItem = await _items.CreateAsync(newItem);
        await _items.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCollectionItem), new { createdItem.Id }, createdItem);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCollectionItem(int id, ItemRequest request)
    {
        if (id != request.Id)
        {
            return BadRequest();
        }

        var userCollection = await _collections.GetAsync(item => item.Id == request.CollectionId);

        if (userCollection == null)
        {
            return BadRequest();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (userCollection.AuthorId != user.Id && !this.User.IsInRole("admin"))
        {
            return Forbid();
        }

        var storedItem = await _items.GetAsync(item => item.Id == request.Id);

        if (storedItem == null)
        {
            return NotFound(); ;
        }

        // TODO: analyze the difference between change tracking and copying data to a new object
        var updatedItem = request.ToDomainModel();

        updatedItem.CollectionId = storedItem.CollectionId;
        updatedItem.Created = storedItem.Created;
        updatedItem.Edited = DateTime.Now;

        await _items.UpdateAsync(updatedItem);
        await _items.SaveChangesAsync();

        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCollectionItem(int id)
    {
        var collectionItem = await _items.GetAsync(item => item.Id == id);

        if (collectionItem == null)
        {
            return NotFound();
        }

        var userCollection = await _collections.GetAsync(item => item.Id == collectionItem.CollectionId);

        if (userCollection == null)
        {
            return BadRequest();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (userCollection.AuthorId != user.Id && !this.User.IsInRole("admin"))
        {
            return Forbid();
        }

        await _items.DeleteAsync(item => item.Id == id);
        await _items.SaveChangesAsync();

        return NoContent();
    }
}
