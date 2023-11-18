namespace ICollector.Server.Models.ApiModels;

public class DetailedInfoResponse
{
    public string Id { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsConfirmedEmail { get; set; }
}
