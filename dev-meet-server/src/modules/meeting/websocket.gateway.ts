import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { Server } from 'socket.io';

// gateway - it's for managing live web socket connections 
@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
})
export class LiveMeetGateway implements OnModuleInit {

    // to get instance of the server
    @WebSocketServer()
    // to send messages to all clients 
    server: Server;
    // this tells the server to listen for connections and when a client connects, it will run the function and log the client id and the room they joined and the message they sent
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log("Client Connected and Socket ID is :-", socket.id);
        });             
    }


    // to send messages to all clients
    @SubscribeMessage('new-message')
    onNewMessage(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('new-message', {
            message: 'New Message',
            messageBody: body,
        });
    }

    // to join a room
    @SubscribeMessage('join-room')
    handleJoinRoom(client: Socket, room: string) {
        client.join(room);
        console.log("Client Joined Room: ", room);
    }

}