﻿namespace ICollector.Server.Models.ApiModels;

public class CollectionRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public string? Number1Name { get; set; }
    public string? Number2Name { get; set; }
    public string? Number3Name { get; set; }
}
