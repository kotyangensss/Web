import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class Gateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('message')
  onNewTrack(@MessageBody() data) {
    console.log(data);
    this.server.emit('track', {
      data: data,
    });
  }
}
