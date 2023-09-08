/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Headers,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { LoginUserDto, CreateUserDto, CrearPrivilegio } from './dto';
import { User } from './entities/auth.entity';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUp(createUserDto);
  }

  @Post('login')
  singIn(@Body() loginUser: LoginUserDto) {
    return this.authService.singIn(loginUser);
  }

  @Post('privilegios')
  crearPrivilegio(@Body() createUserDto: CrearPrivilegio) {
    return this.authService.crearPrivilegio(createUserDto);
  }
  //@Param('servicio') servicio: string
  @Get('privilegios')
  @Auth()
  privilegios(@GetUser() user: User) {
    return this.authService.retornarPrivilegios(user);
  }

  @Get('datos/:host')
  @Auth()
  datosContactos(@GetUser() user: User, @Param('host') host: string) {
    return this.authService.retornarDatosConctactos(user, host);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User, @Headers() headers) {
    //console.log(headers)
    return this.authService.checkAuthStatus(user, headers.base);
  }

  @Post('unlock-session')
  @Auth()
  unlockSsession(@GetUser() user: User, @Body() loginUser: LoginUserDto) {
    //console.log(headers)
    return this.authService.unlockSession(loginUser, user);
  }

  @Delete('salir')
  @Auth()
  desconectar(@GetUser() user: User, @Headers() headers) {
    //console.log(headers)
    return this.authService.desconectar(user);
  }

  @Patch('estado')
  @Auth()
  estadoUsuario(@Body() estado: any, @GetUser() user: User) {
    return this.authService.estadoUsuario(estado, user);
  }

  @Get('users')
  @Auth()
  retornarUsuariosActivos(@GetUser() user: User) {
    return this.authService.retornarUsuariosActivos(user);
  }

  @Get('users-todos')
  @Auth(ValidRoles.admin)
  retornarTodosUsuarios(@GetUser() user: User) {
    return this.authService.retornarTodosUsuarios(user);
  }

}
