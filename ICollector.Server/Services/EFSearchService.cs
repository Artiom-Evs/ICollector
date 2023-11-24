#nullable disable

using ICollector.Server.Data;
using ICollector.Server.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ICollector.Server.Services;

public class EFSearchService : ISearchService
{
    private readonly ApplicationDbContext _context;

    private const string SELECT_ITEMS = @"
SELECT * FROM dbo.Items AS I
JOIN FREETEXTTABLE(dbo.Items, *, @text) AS FTS ON I.Id = FTS.[KEY]
ORDER BY FTS.RANK DESC
";
    private const string SELECT_ITEM_COMMENTS = @"
SELECT * FROM dbo.ItemComments AS IC
JOIN FREETEXTTABLE(dbo.ItemComments, *, @text) AS FTS ON IC.Id = FTS.[KEY]
ORDER BY FTS.RANK DESC
";
    private const string SELECT_COLLECTIONS = @"
SELECT * FROM dbo.Collections AS C
JOIN FREETEXTTABLE(dbo.Collections, *, @text) AS FTS ON C.Id = FTS.[KEY]
ORDER BY FTS.RANK DESC
";

    public EFSearchService(ApplicationDbContext context)
    {
        _context = context;
    }

    public      async Task<IEnumerable<CollectionItem>> SearchItemsAsync(string text, int page = 1, int pageSize = 0)
    {
        var p1 = new SqlParameter("@text", text);
        var items = await _context.Items
            .FromSqlRaw(SELECT_ITEMS, p1)
            .ToListAsync();

        return items;
    }

    public async Task<IEnumerable<ItemComment>> SearchItemCommentsAsync(string text, int page = 1, int pageSize = 0)
    {
        var p1 = new SqlParameter("@text", text);
        var items = await _context.ItemComments
            .FromSqlRaw(SELECT_ITEM_COMMENTS, p1)
            .ToListAsync();

        return items;
    }

    public async Task<IEnumerable<UserCollection>> SearchCollectionsAsync(string text, int page = 1, int pageSize = 0)
    {
        var p1 = new SqlParameter("@text", text);
        var items = await _context.Collections
            .FromSqlRaw(SELECT_COLLECTIONS, p1)
            .ToListAsync();

        return items;
    }
}
