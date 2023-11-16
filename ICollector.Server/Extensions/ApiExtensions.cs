using ICollector.Server.Models;
using ICollector.Server.Models.ApiModels;

namespace ICollector.Server.Extensions;

public static class ApiExtensions
{
    public static CollectionResponse ToApiResponse(this UserCollection item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        Description = item.Description,
        Created = item.Created,
        Edited = item.Edited,
        AuthorId = item.AuthorId,
        Items = item.Items ?? new()
    };

    public static CollectionItem ToDomainModel(this ItemRequest item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        Description = item.Description
    };
}
