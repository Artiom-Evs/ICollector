namespace ICollector.Server.Models.ApiModels;

public class ItemResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }
    public CollectionResponse? Collection { get; set; }

    public int? Number1 { get; set; }
    public int? Number2 { get; set; }
    public int? Number3 { get; set; }

    public string? Text1 { get; set; }
    public string? Text2 { get; set; }
    public string? Text3 { get; set; }

    public string? Multiline1 { get; set; }
    public string? Multiline2 { get; set; }
    public string? Multiline3 { get; set; }
}
