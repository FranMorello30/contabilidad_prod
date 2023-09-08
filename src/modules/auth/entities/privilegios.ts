/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

// @Entity({ name: 'privilegios' })
// export class Privilegios {
//   @PrimaryGeneratedColumn()
//   id: number;
  

//   @Column('char', {length: 200})
//   host: string;

//   @Column('int')
//   id_usuario: number;

//   @Column('char', {length: 200, default: 'salud',})
//   servicio: string;

//   @Column('bool', {
//     default: true,
//   })
//   status: boolean;

// }

@Entity({ name: 'privilegios' })
export class Privilegios {
  @PrimaryGeneratedColumn()
  id: number;
  

  @Column('char', {length: 200})
  host: string;

  @Column('int')
  id_usuario: number;

  @Column('char', {length: 200, default: 'salud',})
  servicio: string;

  @Column('bool', {
    default: true,
  })
  status: boolean;

}



