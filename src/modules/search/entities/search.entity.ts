import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Search {
  @Column('char', {
    unique: true,
    primary: true,
    length: 20,
  })
  cli_id_fiscal: string;

  @Column('char')
  cli_razon_social: string;

  @Column('text')
  cli_comentarios: string;

  @Column('text')
  cli_direccion_fiscal: string;

  @Column('char')
  cli_zona: string;

  @Column('char')
  cli_ciudad: string;

  @Column('char')
  cli_pais: string;

  @Column('char')
  cli_contacto: string;

  @Column('text')
  cli_tlf_contacto: string;

  @Column('text')
  cli_email_contacto: string;

  @Column('decimal')
  cli_deuda_vigente: number;

  @Column('decimal')
  cli_deuda_vencida: number;

  @Column('char')
  cli_fec_ult_gestion: string;

  @Column('char')
  cli_fec_prox_gestion: string;

  @Column('char')
  cli_estado: string;

  @Column('text')
  cli_doctmp1: string;
  @Column('text')
  cli_doctmp2: string;

  @Column('bool', {
    default: true,
  })
  cli_sw_masivo: boolean;

  @Column('char')
  cli_motivo_masivo_off: string;

  @Column('decimal')
  cli_monto_rna: number;

  @Column('int', {
    default: 0,
  })
  cli_usr_asignado: number;

  @Column('text')
  cli_email_tmp1?: string;
}
