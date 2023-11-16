namespace ICollector.Server.Models.ApiModels;

public class CollectionRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
