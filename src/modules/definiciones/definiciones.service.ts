/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { CreateDefinicioneDto } from './dto/create-definicione.dto';
import { UpdateDefinicioneDto } from './dto/update-definicione.dto';
import { Definicion } from './entities/definicione.entity';
import { TENANT_CONNECTION } from 'src/core/host.module';
import { ActualizarEstados } from './dto/actualizar-estado.dto';

@Injectable()
export class DefinicionesService {
  //private repository: Repository<Definicion>;
  constructor(
    @Inject(TENANT_CONNECTION) private readonly _dataSource: DataSource,
  ) {
    //this.repository = this._dataSource.getRepository(Definicion);
  }

  async getTenantConnection() {
    return this._dataSource.getRepository(Definicion);
  }

  // async getDefinicionP(sigla: string) {
  //   //const repository = await this.getTenantConnection();
  //   const res = await this.repository.findOne({
  //     where: {
  //       siglas: sigla,
  //     },
  //   });
  //   return { sigla: res.valor };
  // }
  async getDefinicion(sigla: string) {
    const repositorio = await this.getTenantConnection();
    const [datos] = await repositorio.query('CALL Definir(?, ?)', [sigla, '']);
    //console.log()
    this._dataSource.destroy();
    return { sigla: datos };
  }

  async getFDefinicion(sigla: string) {
    const repositorio = await this.getTenantConnection();
    const [valor] = await repositorio.query('SELECT Definir(?) AS valor', [
      sigla,
      '',
    ]);
    this._dataSource.destroy();
    return valor;
  }

  async retornarDefiniciones() {
    const repositorio = await this.getTenantConnection();
    const definiciones = await repositorio.find({});
    this._dataSource.destroy();
    return { definiciones };
  }
  async crearDefinicion(definicion: CreateDefinicioneDto) {
    const repositorio = await this.getTenantConnection();
    try {
      const definiciones = repositorio.create({
        ...definicion,
      });
      await repositorio.save(definiciones);
      this._dataSource.destroy();
      return { definiciones };
    } catch (error) {
      console.log(error);
    }
  }
  async actualizarDefinicion(definicion: UpdateDefinicioneDto, id: number) {
    const repositorio = await this.getTenantConnection();
    try {
      await repositorio.update(
        {
          id,
        },
        {
          nombre: definicion.nombre,
          tipo: definicion.tipo,
          descripcion: definicion.descripcion,
          valor: definicion.valor,
          status: definicion.status,
        },
      );
      this._dataSource.destroy();
      return { msg: 'Definición actualizada correctamente' };
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: tablas de cxc
  async tablasCxc() {
    const repositorio = await this.getTenantConnection();
    const res = await repositorio.findOne({
      where: {
        siglas: 'cuentasCxc',
      },
      select: ['tipo', 'valor'],
    });
    this._dataSource.destroy();
    return { tablas: JSON.parse(res.valor) };
  }

  //TODO: estado gestiones
  async retornarEstados(estado: string) {
    const repositorio = await this.getTenantConnection();
    const estados = await repositorio.findOne({
      where: {
        siglas: estado,
      },
    });
    this._dataSource.destroy();
    return { estados: JSON.parse(estados.valor) };
  }
  async actualizarEstados(tipo: string, estado: ActualizarEstados) {
    const repositorio = await this.getTenantConnection();
    await repositorio.update(
      {
        siglas: tipo,
      },
      {
        valor: JSON.stringify(estado.estados),
      },
    );

    const estados = await repositorio.findOne({
      where: {
        siglas: tipo,
      },
    });
    this._dataSource.destroy();
    return { estados: JSON.parse(estados.valor) };
  }
}
/* async getColumnasClientes() {
    const arrColumnas: string[] = [];
    const [valor] = await this.repository.query('SELECT Definir(?) AS valor', [
      'CnfListaGestCli',
    ]);
    const columnas = valor.valor.split('|');
    columnas.forEach((opcion) => {
      const result = JSON.parse(opcion);
      arrColumnas.push(result);
    });

    return arrColumnas;
  } */
