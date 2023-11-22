namespace ICollector.Server.Models.ApiModels;

public class ItemRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int CollectionId { get; set; }

    public int? Number1 { get; set; }
    public int? Number2 { get; set; }
    public int? Number3 { get; set; }

    public string? Text1 { get; set; }
    public string? Text2 { get; set; }
    public string? Text3 { get; set; }
}
