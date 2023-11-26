using ICollector.Server.Models.ApiModels;

namespace ICollector.Server.Models;

public class ItemCommentResponse
{
    public int Id { get; set; }
    public ItemResponse? Item { get; set; }
    public int ItemId { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public string Text { get; set; } = string.Empty;
}
