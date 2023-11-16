namespace ICollector.Server.Models.ApiModels;

public class ItemResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }
    public CollectionResponse? Collection { get; set; }
}
