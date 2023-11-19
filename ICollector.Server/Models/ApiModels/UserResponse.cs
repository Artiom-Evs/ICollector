namespace ICollector.Server.Models.ApiModels;

public class UserResponse
{
    public string Id { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string[] Roles { get; set; } = [];
    public DateTimeOffset? BlockedUntil { get; set; }
}
