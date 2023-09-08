/* eslint-disable prettier/prettier */
import {
  IsString,  
} from 'class-validator';

export class CreateDefinicioneDto {
  @IsString()
  tipo: string;
  @IsString()
  nombre: string;
  @IsString()
  descripcion: string;
  @IsString()
  siglas: string;
  @IsString()
  valor: string;
  @IsString()
  status: string;
}
