using System.Text.Json.Serialization;

namespace ICollector.Server.Models;

public class CollectionItem : ModelBase
{
    public string Name { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }

    [JsonIgnore]
    public UserCollection? Collection { get; set; }
    public int CollectionId { get; set; }

}
