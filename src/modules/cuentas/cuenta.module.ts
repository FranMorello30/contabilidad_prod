/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HostModule } from 'src/core/host.module';
import { AuthModule } from '../auth/auth.module';
import { CuentaController } from './cuenta.controller';
import { CuentaService } from './cuenta.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CuentaController],
  providers: [CuentaService],
  imports: [AuthModule, HostModule, CommonModule],
})
export class CuentaModule {}
