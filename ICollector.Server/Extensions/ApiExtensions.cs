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
            Number3Name = collection.Number3Name,

            Text1Name = collection.Text1Name,
            Text2Name = collection.Text2Name,
            Text3Name = collection.Text3Name,

            Multiline1Name = collection.Multiline1Name,
            Multiline2Name = collection.Multiline2Name,
            Multiline3Name = collection.Multiline3Name,
        };
    }

    public static UserCollection ToDomainModel(this CollectionRequest request) => new()
    {
        Id = request.Id,
        Name = request.Name,
        Description = request.Description,

        Number1Name = request.Number1Name,
        Number2Name = request.Number2Name,
        Number3Name = request.Number3Name,

        Text1Name = request.Text1Name,
        Text2Name = request.Text2Name,
        Text3Name = request.Text3Name,

        Multiline1Name = request.Multiline1Name,
        Multiline2Name = request.Multiline2Name,
        Multiline3Name = request.Multiline3Name,
    };

    public static ItemResponse ToApiResponse(this CollectionItem item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        Created = item.Created,
        Edited = item.Edited,
        Collection = item.Collection?.ToApiResponse(),

        Number1 = item.Number1,
        Number2 = item.Number2,
        Number3 = item.Number3,

        Text1 = item.Text1,
        Text2 = item.Text2,
        Text3 = item.Text3,
    };

    public static CollectionItem ToDomainModel(this ItemRequest item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        CollectionId = item.CollectionId,

        Number1 = item.Number1,
        Number2 = item.Number2,
        Number3 = item.Number3,

        Text1 = item.Text1,
        Text2 = item.Text2,
        Text3 = item.Text3,
    };

    public static UserResponse ToApiResponse(this AppUser user) => new()
    {
        Id = user.Id,
        Email = user.Email ?? "",
        BlockedUntil = user.LockoutEnd
    };
}
