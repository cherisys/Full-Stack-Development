﻿using FormulaOne.ChatService.DataService;
using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs
{
    public class ChatHub: Hub
    {
        private readonly SharedDb _sharedDb;

        public ChatHub(SharedDb sharedDb) => _sharedDb = sharedDb;

        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined.");
        }

        public async Task JoinSpecificChatroom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
            _sharedDb.connections[Context.ConnectionId] = conn;
            await Clients.Group(conn.Chatroom).SendAsync("JoinSpecificChatroom", "admin", $"{conn.Username} has joined {conn.Chatroom}.");
        }

        public async Task SendMessage(string msg)
        {
            if (_sharedDb.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.Chatroom).SendAsync("ReceiveSpecificMessage", conn.Username, msg);
            }
        }

    }
}
