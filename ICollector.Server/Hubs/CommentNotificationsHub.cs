using ICollector.Server.Models;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace ICollector.Server.Hubs;

public class CommentNotificationsHub  : Hub<ICommentNotificationsHub>
{
    public async Task JoinToGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task RemoveFromGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }
}
