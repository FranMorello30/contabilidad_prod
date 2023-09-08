import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { NewMessageDto } from './dtos/new-message.dto';

import { MessagesWsService } from './messages-ws.service';
import { JwtPayload } from 'src/modules/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async handleConnection(client: Socket) {
    //console.log(client);
    //console.log('cliente conectado', client.id);
    const token = client.handshake.headers.auth as string;
    //console.log(token);
    let payload: JwtPayload;

    if (token == null || token == 'null') return;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerCliente(client, payload.id);
    } catch (e) {
      console.log(e);
      client.disconnect();
      return;
      //throw new WsException('Invalid credentials');
    }

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );

  }
  async handleDisconnect(client: Socket) {    
 
    //console.log(client)

    this.messagesWsService.removeCliente(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }


  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: any) {
    console.log(payload.message);
    //TODO: emite unicamente al cliente
    /*client.emit('message-from-serve', {
      fullName: 'fran',
      message: payload.message || 'no-message',
    });*/

    //TODO: emitir a todos menso al cliente inicial (client)
    /*client.broadcast.emit('message-from-serve', {
      fullName: 'fran',
      message: payload.message || 'no-message',
    });*/

    //TODO: emite a todos
    this.wss.emit('message-from-serve', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no-message',
      id: client.id,
    });
  }
}
