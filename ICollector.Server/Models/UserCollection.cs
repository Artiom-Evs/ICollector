namespace ICollector.Server.Models;

public class UserCollection : ModelBase
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string AuthorId { get; set; } = string.Empty;

    public List<CollectionItem> Items { get; set; } = new();
}
