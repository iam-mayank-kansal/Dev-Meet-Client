// live-meet.gateway.ts
import {
    OnModuleInit,
    OnModuleDestroy,
  } from "@nestjs/common";
  import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
  } from "@nestjs/websockets";
  import { Server, Socket } from "socket.io";
  
  @WebSocketGateway({
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  })
  export class LiveMeetGateway implements OnModuleInit, OnModuleDestroy {
    @WebSocketServer()
    server: Server;
  
    private rooms = new Map<string, Set<string>>(); // roomId -> set of socketIds
  
    onModuleInit() {
      this.server.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
  
        socket.on("disconnecting", () => {
          // Remove socket from all rooms on disconnect
          this.rooms.forEach((clients, roomId) => {
            if (clients.has(socket.id)) {
              clients.delete(socket.id);
              this.server.to(roomId).emit("user-left", socket.id);
              // Remove room if empty
              if (clients.size === 0) this.rooms.delete(roomId);
            }
          });
        });
      });
    }
  
    onModuleDestroy() {
      this.server.close();
    }
  
    @SubscribeMessage("join-room")
    handleJoinRoom(
      @ConnectedSocket() client: Socket,
      @MessageBody() roomId: string
    ) {
      client.join(roomId);
  
      if (!this.rooms.has(roomId)) this.rooms.set(roomId, new Set());
      this.rooms.get(roomId).add(client.id);
  
      // Inform existing clients in room about new user
      client.to(roomId).emit("user-joined", client.id);
  
      // Send back to the newly joined client the list of existing users in the room
      const otherClients = Array.from(this.rooms.get(roomId)).filter(
        (id) => id !== client.id
      );
      client.emit("all-users", otherClients);
  
      console.log(`Client ${client.id} joined room ${roomId}`);
    }
  
    // Signaling data forwarding
    // peer-to-peer WebRTC signaling messages: offer, answer, candidate
    @SubscribeMessage("signal")
    handleSignal(
      @ConnectedSocket() client: Socket,
      @MessageBody()
      data: { to: string; from: string; signal: any }
    ) {
      this.server.to(data.to).emit("signal", {
        from: data.from,
        signal: data.signal,
      });
    }
  }
  