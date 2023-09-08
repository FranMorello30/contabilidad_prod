import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/modules/auth/entities/auth.entity';

import { Repository } from 'typeorm';

interface ConnectedClients {
  [id: string]: { socket: Socket; user: User };
}

@Injectable()
export class MessagesWsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private connectedClients: ConnectedClients = {};
  async registerCliente(client: Socket, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('user no found');
    if (!user.status) throw new Error('user no active');

    //console.log(client.id);

    this.checkUserConnection(user);

    this.connectedClients[client.id] = { socket: client, user };

    //console.log(this.connectedClients);
  }
  removeCliente(clientId: string) {
    console.log('cliente desconectado', clientId);
    delete this.connectedClients[clientId];
    // console.log(this.connectedClients);
  }
  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }
  getUserFullName(socketId: string) {
    return this.connectedClients[socketId].user.nombre;
  }
  private checkUserConnection(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectClient = this.connectedClients[clientId];
      if (connectClient.user.id === user.id) {
        connectClient.socket.disconnect(true);
        delete this.connectedClients[clientId];
        break;
      }
    }
  }
}
