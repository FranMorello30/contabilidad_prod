/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { Auth, GetUser } from '../auth/decorators';

import { CuentaService } from './cuenta.service';
import { CrearCuenta } from './dto/crear-cuenta';

@Controller('cuentas')
export class CuentaController {
  constructor(private readonly _carteraService: CuentaService) {}

  @Post()
  crear(@Body() crearCuenta: CrearCuenta) {
    return this._carteraService.crear(crearCuenta);
  }
}
