/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

// @Entity({ name: 'front' })
// export class Menu {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('char')
//   clave: string;

//   @Column('char')
//   tipo: string;

//   @Column('text')
//   contenido: string;

//   @Column('char')
//   nombre: string;

//   @Column('text')
//   comentarios: string;

//   @Column('char')
//   estado: string;
// }
@Entity({ name: 'tenant' })
export class Menu {
  @PrimaryColumn('char')
  host: string;

  @Column('char')
  name: string;

  @Column('text')
  menu: string;
}
