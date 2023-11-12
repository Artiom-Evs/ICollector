namespace ICollector.Server.Models;

public class UserCollection : ModelBase
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }
    public string AuthorId { get; set; } = string.Empty;

    public List<CollectionItem> Items { get; set; } = new();
}
