/* eslint-disable prettier/prettier */
import { IsString, IsArray } from 'class-validator';

export class ActualizarEstados {
  @IsString({ each: true })
  @IsArray()
  estados: string[];
}
