/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'definiciones' })
export class Definiciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char')
  siglas: string;

  @Column('text')
  valor: string;

}
