/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MaxLength, MinLength,IsNumber } from 'class-validator';

export class CrearPrivilegio {
  @IsString()
  host: string;

  @IsNumber()  
  id_usuario: number;

  @IsString()
  @MinLength(1)
  servicio: string;
}
