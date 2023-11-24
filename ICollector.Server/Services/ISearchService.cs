using ICollector.Server.Models;

namespace ICollector.Server.Services;

public interface ISearchService
{
    Task<IEnumerable<CollectionItem>> SearchItemsAsync(string text, int page = 1, int pageSize = 0);
    Task<IEnumerable<ItemComment>> SearchItemCommentsAsync(string text, int page = 1, int pageSize = 0);
    Task<IEnumerable<UserCollection>> SearchCollectionsAsync(string text, int page = 1, int pageSize = 0);
}
