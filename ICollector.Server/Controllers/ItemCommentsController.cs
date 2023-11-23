using ICollector.Server.Extensions;
using ICollector.Server.Models;
using ICollector.Server.Models.ApiModels;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ICollector.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ItemCommentsController : ControllerBase
{
    private readonly IDataRepository<CollectionItem> _items;
    private readonly IDataRepository<ItemComment> _comments;
    private readonly UserManager<AppUser> _userManager;

    public ItemCommentsController(IDataRepository<CollectionItem> items, IDataRepository<ItemComment> comments, UserManager<AppUser> userManager)
    {
        _items = items;
        _comments = comments;
        _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemCommentResponse>>> GetItemComments(int itemId = 0, int page = 1, int pageSize = 0)
    {
        var comments = _comments.Query();

        if (itemId != 0)
        {
            comments = comments.Where(comment => comment.ItemId == itemId);
        }

        if (pageSize != 0)
        {
            comments = comments
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        var responseComments = await comments
            .Select(i => i.ToApiResponse())
            .ToArrayAsync();

        var authorIds = responseComments
            .Select(i => i.AuthorId)
            .ToArray();
        var authors = _userManager.Users
            .Where(u => authorIds.Contains(u.Id))
            .Select(u => new { u.Id, u.UserName })
            .ToList();

        foreach (var comment in responseComments)
        {
            comment.AuthorName = authors.Find(a => a.Id == comment.AuthorId)?.UserName ?? "unknown";
        }

        return Ok(responseComments);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<ItemCommentResponse>> GetItemComment(int id)
    {
        var comment = await _comments.Query().FirstOrDefaultAsync(comment => comment.Id == id);

        if (comment == null)
        {
            return NotFound();
        }

        var responseComment = comment.ToApiResponse();

        var user = await _userManager.FindByIdAsync(responseComment.AuthorId);
        responseComment.AuthorName = user?.UserName ?? "unknown";

        return Ok(responseComment);
    }

    [HttpPost]
    public async Task<ActionResult<ItemCommentResponse>> PostItemComment(ItemCommentRequest request)
    {
        var item = await _items.GetAsync(item => item.Id == request.ItemId);

        if (item == null)
        {
            return BadRequest();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        var newComment = request.ToDomainModel();
        newComment.Created = newComment.Edited = newComment.Edited = DateTime.Now;
        newComment.AuthorId = user.Id;
        
        var createdComment = await _comments.CreateAsync(newComment);
        await _comments.SaveChangesAsync();

        return CreatedAtAction(nameof(GetItemComment), new { createdComment.Id }, createdComment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutItemComment(int id, ItemCommentRequest request)
    {
        if (id != request.Id)
        {
            return BadRequest();
        }

        var item = await _items.GetAsync(item => item.Id == request.ItemId);

        if (item == null)
        {
            return BadRequest();
        }

        var storedComment = await _comments.GetAsync(comment => comment.Id == request.Id);

        if (storedComment == null)
        {
            return NotFound();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (storedComment.AuthorId != user.Id && !this.User.IsInRole("admin"))
        {
            return Forbid();
        }

        // TODO: analyze the difference between change tracking and copying data to a new object
        var updatedComment = request.ToDomainModel();

        updatedComment.ItemId = storedComment.ItemId;
        updatedComment.AuthorId = storedComment.AuthorId;
        updatedComment.Created = storedComment.Created;
        updatedComment.Edited = DateTime.Now;

        await _comments.UpdateAsync(updatedComment);
        await _comments.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCollectionItem(int id)
    {
        var comment = await _comments.GetAsync(comment => comment.Id == id);

        if (comment == null)
        {
            return NotFound();
        }

        var user = await _userManager.GetUserAsync(HttpContext.User)
            ?? throw new InvalidOperationException();

        if (comment.AuthorId != user.Id && !this.User.IsInRole("admin"))
        {
            return Forbid();
        }

        await _comments.DeleteAsync(item => item.Id == id);
        await _comments.SaveChangesAsync();

        return NoContent();
    }
}
