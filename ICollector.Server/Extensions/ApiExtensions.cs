using ICollector.Server.Models;
using ICollector.Server.Models.ApiModels;

namespace ICollector.Server.Extensions;

public static class ApiExtensions
{
    public static CollectionResponse ToApiResponse(this UserCollection collection)
    {
        foreach (var item in collection.Items)
        {
            item.Collection = null;
        }

        return new()
        {
            Id = collection.Id,
            Name = collection.Name,
            Description = collection.Description,
            Created = collection.Created,
            Edited = collection.Edited,
            AuthorId = collection.AuthorId,
            Items = collection.Items?.Select(i => i.ToApiResponse())?.ToList() ?? [],

            Number1Name = collection.Number1Name,
            Number2Name = collection.Number2Name,
            Number3Name = collection.Number3Name
        };
    }

    public static UserCollection ToDomainModel(this CollectionRequest request) => new()
    {
        Id = request.Id,
        Name = request.Name,
        Description = request.Description,

        Number1Name = request.Number1Name,
        Number2Name = request.Number2Name,
        Number3Name = request.Number3Name
    };

    public static ItemResponse ToApiResponse(this CollectionItem item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        Created = item.Created,
        Edited = item.Edited,
        Collection = item.Collection?.ToApiResponse()
    };

    public static CollectionItem ToDomainModel(this ItemRequest item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        CollectionId = item.CollectionId
    };

    public static UserResponse ToApiResponse(this AppUser user) => new()
    {
        Id = user.Id,
        Email = user.Email ?? "",
        BlockedUntil = user.LockoutEnd
    };
}
