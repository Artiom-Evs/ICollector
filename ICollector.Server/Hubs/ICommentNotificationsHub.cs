using ICollector.Server.Models;

namespace ICollector.Server.Hubs;

public interface ICommentNotificationsHub
{
    Task ReceiveItemComment(ItemCommentResponse comment);
}
