using ICollector.Server.Models;

namespace ICollector.Server.Models.ApiModels;

public class CollectionResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;

    public List<ItemResponse> Items { get; set; } = [];

    public string? Number1Name { get; set; }
    public string? Number2Name { get; set; }
    public string? Number3Name { get; set; }

    public string? Text1Name { get; set; }
    public string? Text2Name { get; set; }
    public string? Text3Name { get; set; }

    public string? Multiline1Name { get; set; }
    public string? Multiline2Name { get; set; }
    public string? Multiline3Name { get; set; }
}
