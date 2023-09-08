/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CrearCuenta {
  @IsString()
  nro: string;

  @IsString()
  nombre: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  nivel: number;

  @IsOptional()
  @IsString()
  comentarios: string;
}
