using ICollector.Server.Extensions;
using ICollector.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ICollector.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : Controller
{
    private readonly ISearchService _search;

    public SearchController(ISearchService search)
    {
        _search = search;
    }

    [HttpGet("Items")]
    public async Task<IActionResult> SearchItemsAsync(string text)
    {
        var items = await _search.SearchItemsAsync(text);
        var itemResponses = items.Select(i => i.ToApiResponse()).ToArray();
        return Ok(itemResponses);
    }

    [HttpGet("ItemComments")]
    public async Task<IActionResult> SearchItemCommentsAsync(string text)
    {
        var comments = await _search.SearchItemCommentsAsync(text);
        var commentResponses = comments.Select(i => i.ToApiResponse()).ToArray();
        return Ok(commentResponses);
    }

    [HttpGet("Collections")]
    public async Task<IActionResult> SearchCollectionsAsync(string text)
    {
        var collections = await _search.SearchCollectionsAsync(text);
        var collectionResponses = collections.Select(i => i.ToApiResponse()).ToArray();

        return Ok(collectionResponses);
    }
}
