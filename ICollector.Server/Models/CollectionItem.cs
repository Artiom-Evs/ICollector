﻿using System.Text.Json.Serialization;

namespace ICollector.Server.Models;

public class CollectionItem : ModelBase
{
    public string Name { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }

    public int CollectionId { get; set; }
    public UserCollection? Collection { get; set; }

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
