/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { Tenant } from './host.entity';

import { Definicion } from 'src/modules/definiciones/entities/definicione.entity';

// import { Plantilla } from 'src/modules/plantillas/entities/plantilla.entity';

//import { Menu } from 'src/modules/menu/entities/menu.entity';

import { Cuenta } from 'src/modules/cuentas/entities/cuenta.entity';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [
    {
      provide: TENANT_CONNECTION,
      inject: [REQUEST, DataSource, ConfigService],
      scope: Scope.REQUEST,
      useFactory: async (
        request,
        dataSource: DataSource,
        configservice: ConfigService,
      ) => {
        const tenant: Tenant = await dataSource
          .getRepository(Tenant)
          .findOne({ where: { host: request.headers.base } });

        const createdConnection: DataSource = new DataSource({
          name: tenant.name,
          type: 'mysql',
          host: configservice.get('BD_HOST'),
          port: +configservice.get('BD_PORT'),
          username: configservice.get('BD_USERNAME'),
          password: configservice.get('DB_PASSWORD'),
          database: tenant.name,
          entities: [Cuenta, Definicion],
          synchronize: false,
        });

        return createdConnection.initialize();
      },
    },
  ],
  exports: [TENANT_CONNECTION],
})
export class HostModule {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configservice: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req, res, next) => {
        const tenant: Tenant = await this.dataSource
          .getRepository(Tenant)
          .findOne({ where: { host: req.headers.base } });

        if (!tenant) {
          throw new BadRequestException(
            'Error de conexión con la base de datos',
          );
        }

        try {
          this.dataSource.getRepository(tenant.name);
          next();
        } catch (e) {
          const createdConnection: DataSource = new DataSource({
            name: tenant.name,
            type: 'mysql',
            host: this.configservice.get('BD_HOST'),
            port: +this.configservice.get('BD_PORT'),
            username: this.configservice.get('BD_USERNAME'),
            password: this.configservice.get('DB_PASSWORD'),
            database: tenant.name,
            entities: [Cuenta, Definicion],
            synchronize: false,
          });

          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException(
              'Error de conexión con la base de datos',
            );
          }
        }
      })
      .exclude(
        { path: '/api/auth/salir', method: RequestMethod.ALL },
        { path: '/api/auth/login', method: RequestMethod.ALL },
        { path: '/api/auth/register', method: RequestMethod.ALL },
        { path: '/api/auth/privilegios', method: RequestMethod.ALL },
        { path: '/api/ejecutivos', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
