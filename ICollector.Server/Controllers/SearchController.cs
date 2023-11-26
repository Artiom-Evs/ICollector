using ICollector.Server.Extensions;
using ICollector.Server.Models;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ICollector.Server.Controllers;


[ApiController]
[Route("api/[controller]")]
public class SearchController : Controller
{
    private readonly ISearchService _search;
    private readonly UserManager<AppUser> _userManager;

    public SearchController(ISearchService search, UserManager<AppUser> userManager)
    {
        _search = search;
        _userManager = userManager;
    }

    [HttpGet("Items")]
    public async Task<IActionResult> SearchItemsAsync(string text)
    {
        var items = await _search.SearchItemsAsync(text);
        var authorIds = items.Select(c => c.Collection?.AuthorId ?? "");
        var authors = await _userManager.Users
            .Where(u => authorIds.Contains(u.Id))
            .Select(u => new { Id = u.Id, Name = u.UserName })
            .ToArrayAsync();

        var itemResponses = items
            .Select(i =>
            {
                var response = i.ToApiResponse();
                if (response.Collection != null)
                    response.Collection.AuthorName = authors.FirstOrDefault(u => u.Id == response.Collection.AuthorId)?.Name ?? "unknown";
                return response;
            })
            .ToArray();

        return Ok(itemResponses);
    }

    [HttpGet("ItemComments")]
    public async Task<IActionResult> SearchItemCommentsAsync(string text)
    {
        var comments = await _search.SearchItemCommentsAsync(text);
        var authorIds = comments.Select(c => c.AuthorId);
        var authors = await _userManager.Users
            .Where(u => authorIds.Contains(u.Id))
            .Select(u => new { Id = u.Id, Name = u.UserName })
            .ToArrayAsync();

        var commentResponses = comments
            .Select(c =>
            {
                var response = c.ToApiResponse();
                response.AuthorName = authors.FirstOrDefault(u => u.Id == response.AuthorId)?.Name ?? "unknown";
                return response;
            })
            .ToArray();

        return Ok(commentResponses);
    }

    [HttpGet("Collections")]
    public async Task<IActionResult> SearchCollectionsAsync(string text)
    {
        var collections = await _search.SearchCollectionsAsync(text);
        var authorIds = collections.Select(c => c.AuthorId);
        var authors = await _userManager.Users
            .Where(u => authorIds.Contains(u.Id))
            .Select(u => new { Id = u.Id, Name = u.UserName })
            .ToArrayAsync();

        var collectionResponses = collections
            .Select(c =>
            {
                var response = c.ToApiResponse();
                response.AuthorName = authors.FirstOrDefault(u => u.Id == response.AuthorId)?.Name ?? "unknown";
                return response;
            })
            .ToArray();

        return Ok(collectionResponses);
    }
}
