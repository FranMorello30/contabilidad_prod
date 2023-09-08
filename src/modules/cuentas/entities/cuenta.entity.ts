/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cuentas' })
export class Cuenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 200, unique: true })
  nro: string;

  @Column({ type: 'char', length: 100 })
  nombre: string;

  @Column('int')
  nivel: number;

  @Column({ type: 'text', nullable: true })
  comentarios: string;
}
