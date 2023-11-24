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
        return Ok(items);
    }

    [HttpGet("ItemComments")]
    public async Task<IActionResult> SearchItemCommentsAsync(string text)
    {
        var items = await _search.SearchItemCommentsAsync(text);
        return Ok(items);
    }

    [HttpGet("Collections")]
    public async Task<IActionResult> SearchCollectionsAsync(string text)
    {
        var items = await _search.SearchCollectionsAsync(text);
        return Ok(items);
    }
}
