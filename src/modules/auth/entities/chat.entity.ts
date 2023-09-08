/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  messages: string;

  @Column('int')
  contactoId: number;

}
