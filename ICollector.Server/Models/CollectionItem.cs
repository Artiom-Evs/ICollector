using System.Text.Json.Serialization;

namespace ICollector.Server.Models;

public class CollectionItem : ModelBase
{
    public string Name { get; set; } = string.Empty;

    [JsonIgnore]
    public UserCollection? Collection { get; set; }
    public int CollectionId { get; set; }

}
