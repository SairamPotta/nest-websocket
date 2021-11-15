import { Module } from '@nestjs/common';
import { MessageGateway } from './websocket/message.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [MessageGateway]
})
export class AppModule {}
