/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [AuthModule, TypeOrmModule.forFeature([Menu])],
})
export class MenuModule {}
