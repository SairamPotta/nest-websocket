import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';

import WebSocket, { Server } from 'ws';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('Message Gateway WS');

  afterInit() {
    this.logger.log('Server Initialized');
  }

  handleConnection(client: WebSocket) {
    this.logger.log('Client Connected', this.server.clients.size);
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log('Client disconnected', this.server.clients.size);
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: any): void {
    this.logger.log(`payload of message:: ${payload}`);
    client.send(JSON.stringify({ data: payload }));
  }
}
