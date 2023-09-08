/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { TENANT_CONNECTION } from 'src/core/host.module';
import { User } from '../auth/entities/auth.entity';

@Injectable()
export class MenuService {
  private readonly logger = new Logger('MenuService');

  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async retornarMenu(user: User, base: string) {
    const result = await this.menuRepository.findOne({
      where: {
        host: base,
      },
      select: ['menu'],
    });
    const menu = JSON.parse(result.menu);

    return { menuApp: menu[user.rol] };
  }
}
