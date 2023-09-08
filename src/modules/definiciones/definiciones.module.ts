/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DefinicionesService } from './definiciones.service';
import { DefinicionesController } from './definiciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Definicion } from './entities/definicione.entity';
import { AuthModule } from '../auth/auth.module';
import { HostModule } from 'src/core/host.module';
@Module({
  controllers: [DefinicionesController],
  providers: [DefinicionesService],
  imports: [AuthModule, HostModule],
})
export class DefinicionesModule {}
