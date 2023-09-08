/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { DefinicionesService } from './definiciones.service';
import { CreateDefinicioneDto } from './dto/create-definicione.dto';
import { UpdateDefinicioneDto } from './dto/update-definicione.dto';
import { ActualizarEstados } from './dto/actualizar-estado.dto';

@Controller('definiciones')
export class DefinicionesController {
  constructor(private readonly definicionesService: DefinicionesService) {}

  @Get('sigla/proced/:id')
  @Auth()
  siglaProcedure(@Param('id') sigla: string) {
    return this.definicionesService.getDefinicion(sigla);
  }

  @Get('sigla/fun/:id')
  @Auth()
  siglaFuntion(@Param('id') sigla: string) {
    return this.definicionesService.getFDefinicion(sigla);
  }

  // @Get('siglap/proced/:id')
  // @Auth()
  // siglaProcedurePrueba(@Param('id') sigla: string) {
  //   return this.definicionesService.getDefinicionP(sigla);
  // }

  //@Param('edo') estado: string

  @Get('cxc')
  tablasCxc() {
    return this.definicionesService.tablasCxc();
  }

  @Get('estados/:edo')
  @Auth()
  retornarEstados(@Param('edo') estado: string) {
    return this.definicionesService.retornarEstados(estado);
  }
  @Put('estados/:edo')
  @Auth()
  actualizarEstado(
    @Param('edo') tipo: string,
    @Body() estados: ActualizarEstados,
  ) {
    return this.definicionesService.actualizarEstados(tipo, estados);
  }

  // @Get('columnas')
  // @Auth()
  // columnasListaClientes() {
  //   return this.definicionesService.getColumnasClientes();
  // }

  @Get('')
  @Auth()
  retornarAll() {
    return this.definicionesService.retornarDefiniciones();
  }

  @Post()
  @Auth()
  crearDefinicion(@Body() definicion: CreateDefinicioneDto) {
    return this.definicionesService.crearDefinicion(definicion);
  }

  @Put(':id')
  @Auth()
  actualizarDefinicion(
    @Body() definicion: UpdateDefinicioneDto,
    @Param('id') id: number,
  ) {
    return this.definicionesService.actualizarDefinicion(definicion, id);
  }
}
