import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

// see to proxy config!
// WebSockets are disabled by default, 'ws: true' is required.
const URL = "/_hubs/comments";

export const HubActions = {
    JoinToGroup: "JoinToGroup",
    RemoveFromGroup: "RemoveFromGroup",
    ReceiveItemComment: "ReceiveItemComment"
}

class SignalRService {
    private static instance: SignalRService;

    connection: HubConnection;

    constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();

        this.connection.start()
            .catch(error => console.error(error));
    }

    static createInstance() {
        if (!this.instance)
            this.instance = new SignalRService();
        return this.instance;
    }
}

const signalRService = SignalRService.createInstance();

export default signalRService;
