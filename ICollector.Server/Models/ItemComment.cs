namespace ICollector.Server.Models;

public class ItemComment : ModelBase
{
    public CollectionItem? Item { get; set; }
    public int ItemId { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }
    public string Text { get; set; } = string.Empty;
}
