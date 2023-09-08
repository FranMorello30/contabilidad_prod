/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: 'login' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char',{length: 225})
  email: string;

  @Column('char',{length: 200})
  uid: string;

  @Column('text')
  password: string;

  @Column('text')
  avatar: string;

  @Column('text')
  estado: string;

  @Column('text')
  chat_info: string;
  @Column('text')
  otros_datos: string;
  @Column('char', {length: 50})
  username: string;

  @Column('char', {length: 50})
  nombre: string;

  @Column('bool', {
    default: true,
  })
  status: boolean;

  @Column('char',{length: 100, default: 'EJECUTIVO'})
  rol: string;

  @Column('char', {length: 20})
  telefono: string;

  @BeforeInsert()
  valirdarCheck() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  valirdarCheckUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
