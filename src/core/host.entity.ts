/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'tenant' })
@Unique(['host'])
export class Tenant {

  @PrimaryColumn()
  host: string;

  @Column()
  name: string;

}
