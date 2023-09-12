/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TENANT_CONNECTION } from 'src/core/host.module';

import { Cuenta } from './entities/cuenta.entity';
import { CrearCuenta } from './dto/crear-cuenta';
import { CommonService } from 'src/common/services/common.service';

@Injectable()
export class CuentaService {
  private repository: Repository<Cuenta>;
  constructor(
    @Inject(TENANT_CONNECTION) private readonly _dataSource: DataSource,
    private readonly _commonService: CommonService,
  ) {}

  async crear(crearCuenta: CrearCuenta) {
    this.repository = this._dataSource.getRepository(Cuenta);
    try {
      const cuenta = this.repository.create({
        ...crearCuenta,
      });
      const resultado = await this.repository.save(cuenta);
      return { cuenta: resultado };
    } catch (error) {
      return this._commonService.internalRequest(
        'creación cuenta',
        'Ups.. error al intentar crear la cuenta, contacte al administrador',
        error,
      );
    }
  }
  async retornarTodas() {
    this.repository = this._dataSource.getRepository(Cuenta);
    try {
      const cuentas = await this.repository.find({});
      return { cuentas };
    } catch (error) {
      return this._commonService.internalRequest(
        'retotnar cuentas',
        'Ups.. error al intentar retornar las cuentas, contacte al administrador',
        error,
      );
    }
  }
}
