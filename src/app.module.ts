/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { HostModule } from './core/host.module';
import { AuthModule } from './modules/auth/auth.module';

import { Tenant } from './core/host.entity';
import { User } from './modules/auth/entities/auth.entity';

import { Privilegios } from './modules/auth/entities/privilegios';

import { UploadsModule } from './uploads/uploads.module';

import { DefinicionesModule } from './modules/definiciones/definiciones.module';

import { ServeStaticModule } from '@nestjs/serve-static';

import { MenuModule } from './modules/menu/menu.module';
import { Definiciones } from './modules/auth/entities/definicione.entity';

import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { Menu } from './modules/menu/entities/menu.entity';
import { SearchModule } from './modules/search/search.module';
import { CuentaModule } from './modules/cuentas/cuenta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          type: 'mysql',
          host: config.get('BD_HOST'),
          username: config.get('BD_USERNAME'),
          password: config.get('DB_PASSWORD'),
          port: +config.get('BD_PORT'),
          database: config.get('DB_NAME'),
          entities: [Tenant, User, Privilegios, Definiciones, Menu],
          synchronize: false,
        };
      },
    }),

    ServeStaticModule.forRoot({
      //rootPath: 'public',
      rootPath: join(__dirname, '..', 'public'),
    }),
    HostModule,
    AuthModule,
    CuentaModule,
    DefinicionesModule,

    MenuModule,
    MessagesWsModule,

    UploadsModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
