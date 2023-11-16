namespace ICollector.Server.Models.ApiModels;

public class ItemRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int CollectionId { get; set; }
}
