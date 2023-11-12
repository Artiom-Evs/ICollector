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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ICollector.Server.Controllers
{
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
        public async Task<ActionResult<IEnumerable<UserCollection>>> GetUserCollections()
        {
            var items = await _context.GetAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserCollection>> GetUserCollection(int id)
        {
            var userCollection = await _context.GetAsync(item => item.Id == id);

            if (userCollection == null)
            {
                return NotFound();
            }

            return userCollection;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<UserCollection>> PostUserCollection(UserCollection userCollection)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User)
                ?? throw new InvalidOperationException();

            userCollection.AuthorId = user.Id;
            userCollection.Created = userCollection.Edited = DateTime.Now;

            await _context.CreateAsync(userCollection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserCollection", new { id = userCollection.Id }, userCollection);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserCollection(int id, UserCollection userCollection)
        {
            if (id != userCollection.Id)
            {
                return BadRequest();
            }

            var storedCollection = await _context.GetAsync(item => item.Id == userCollection.Id);

            if (storedCollection == null)
            {
                return BadRequest();
            }

            var user = await _userManager.GetUserAsync(HttpContext.User)
                ?? throw new InvalidOperationException();

            if (storedCollection.AuthorId != user.Id)
            {
                return Forbid();
            }

            if (storedCollection.Name != userCollection.Name)
            {
                storedCollection.Name = userCollection.Name;
            }

            if (storedCollection.Description != userCollection.Description)
            {
                storedCollection.Description = userCollection.Description;
            }

            storedCollection.Edited = DateTime.Now;
            await _context.UpdateAsync(storedCollection);
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

            if (userCollection.AuthorId != user.Id)
            {
                return Forbid();
            }
            
            await _context.DeleteAsync(item => item.Id == id);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
