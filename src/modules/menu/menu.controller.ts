/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Headers } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/auth.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @Auth()
  retornarMenu(@GetUser() user: User, @Headers() headers) {
    console.log(headers);
    return this.menuService.retornarMenu(user, headers.base);
  }
}
