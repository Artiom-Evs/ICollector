using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ICollector.Server.Data;
using ICollector.Server.Models;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace ICollector.Server.Controllers
{
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
        public async Task<ActionResult<IEnumerable<CollectionItem>>> GetItems()
        {
            var items = await _items.GetAsync();
            return Ok(items);
        }

        // GET: api/Items/5
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

            await _items.UpdateAsync(collectionItem);
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
}
