/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'definiciones' })
export class Definicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char')
  tipo: string;

  @Column('char')
  nombre: string;

  @Column('char')
  descripcion: string;

  @Column('char')
  siglas: string;

  @Column('text')
  valor: string;

  @Column('char', {
    default: 'ACTIVO',
  })
  status: string;

  @Column('char', {
    nullable: true,
  })
  opciones: string;
}
