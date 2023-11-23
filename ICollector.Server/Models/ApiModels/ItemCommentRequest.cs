namespace ICollector.Server.Models;

public class ItemCommentRequest
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public string Text { get; set; } = string.Empty;
}
