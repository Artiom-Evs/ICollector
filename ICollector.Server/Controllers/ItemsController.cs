using ICollector.Server.Extensions;
using ICollector.Server.Models;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ItemsController : ControllerBase
{
    private readonly IDataRepository<UserCollection> _collections;
    private readonly IDataRepository<CollectionItem> _items;
    private readonly UserManager<AppUser> _userManager;

    public ItemsController(IDataRepository<UserCollection> collections, IDataRepository<CollectionItem> items, UserManager<AppUser> userManager)
    {
        _collections = collections;
        _items = items;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CollectionItem>>> GetItems(string orderBy, bool descending, int page = 1, int pageSize = int.MaxValue)
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

        items = items
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        return Ok(await items.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CollectionItem>> GetCollectionItem(int id)
    {
        var item = await _items.GetAsync(item => item.Id == id);



        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CollectionItem>> PostCollectionItem(CollectionItem collectionItem)
    {
        var userCollection = await _collections.GetAsync(item => item.Id == collectionItem.CollectionId);

        if (userCollection == null)
        {
            return BadRequest();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (userCollection.AuthorId != user.Id)
        {
            return Forbid();
        }

        collectionItem.Created = collectionItem.Edited = DateTime.Now;
        await _items.CreateAsync(collectionItem);
        await _items.SaveChangesAsync();

        return CreatedAtAction("GetCollectionItem", new { collectionItem.Id }, collectionItem);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCollectionItem(int id, CollectionItem collectionItem)
    {
        if (id != collectionItem.Id)
        {
            return BadRequest();
        }

        var userCollection = await _collections.GetAsync(item => item.Id == collectionItem.CollectionId);

        if (userCollection == null)
        {
            return BadRequest();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (userCollection.AuthorId != user.Id)
        {
            return Forbid();
        }

        var storedItem = await _items.GetAsync(item => item.Id == collectionItem.Id);

        if (storedItem == null)
        {
            return NotFound(); ;
        }

        if (storedItem.Name != collectionItem.Name)
        {
            storedItem.Name = collectionItem.Name;
        }

        storedItem.Edited = DateTime.Now;
        await _items.UpdateAsync(storedItem);
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

        if (userCollection.AuthorId != user.Id)
        {
            return Forbid();
        }

        await _items.DeleteAsync(item => item.Id == id);
        await _items.SaveChangesAsync();

        return NoContent();
    }
}
