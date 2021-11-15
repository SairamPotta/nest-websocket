import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway(3200, { cors: true })
export class IoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  readonly context = 'IOGateway';
  readonly logger = new Logger(this.context);

  constructor() {}

  @WebSocketServer() server: Server;

  afterInit(server) {
    this.logger.log('Server Initialized', this.context);
  }

  handleConnection(client: any, args: any) {
    this.logger.log('Client Connection Established', this.context);
  }

  handleDisconnect(client: any) {
    this.logger.log('Client Connection Disconnected', this.context);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.server.emit('message', payload);
  }
}
