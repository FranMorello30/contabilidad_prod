/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { IErrorsTypeORM } from 'src/common/interfaces/errors.interfaces';

import { CreateUserDto, LoginUserDto, CrearPrivilegio } from './dto';
import { User } from './entities/auth.entity';

import { JwtPayload } from './interfaces/jwt.interface';
import { Privilegios } from './entities/privilegios';
import { Definiciones } from './entities/definicione.entity';
import { Chat } from './entities/chat.entity';
import { CommonService } from 'src/common/services/common.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Privilegios)
    private readonly privilegioRepository: Repository<Privilegios>,
    @InjectRepository(Definiciones)
    private readonly definicionRepository: Repository<Definiciones>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly jwtService: JwtService,
    private readonly _commonService: CommonService,
  ) {}

  async estadoUsuario(estado, user: User) {
    console.log(estado);
    try {
      await this.userRepository.update(user.id, {
        estado: estado.estado,
      });

      user.estado = estado.estado;

      return { ...user };
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async desconectar(user: User) {
    //  console.log(user)
    try {
      await this.userRepository.update(user.id, {
        estado: 'desconectado',
      });

      return null;
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async singUp(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        estado: 'desconectado',
        otros_datos: JSON.stringify({}),
        chat_info: JSON.stringify({ group_chats: '' }),
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      //delete user.id;
      user.estado = 'en linea';
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async singIn(loginUserDto: LoginUserDto) {
    try {
      const { password, username } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { username },
      });

      if (!user) {
        return this._commonService.badRequest(
          'autenticacion',
          'Credenciales no validas',
          'Credenciales no validas',
        );
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return this._commonService.badRequest(
          'autenticacion',
          'Credenciales no validas',
          null,
        );
      }

      if (user.status === false) {
        return this._commonService.badRequest(
          'autenticacion',
          'Usuario sin acceso, contacte al administrador',
          null,
        );
      }

      await this.userRepository.update(user.id, {
        estado: 'en linea',
      });

      const id = user.id;

      delete user.password;

      user.estado = 'en linea';
      user.avatar = user.avatar.length === 0 ? null : user.avatar;
      user.chat_info = JSON.parse(user.chat_info);

      return { ...user, token: this.getJwtToken({ id }) };
    } catch (err) {
      return this._commonService.internalRequest(
        'autenticacion',
        'Error de autenticacion, contacte al administrador',
        err,
      );
    }
  }
  async crearPrivilegio(createUserDto: CrearPrivilegio) {
    try {
      const user = this.privilegioRepository.create({
        ...createUserDto,
      });
      await this.privilegioRepository.save(user);

      return { ...createUserDto };
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async retornarPrivilegios(user: User) {
    //  console.log(user)
    try {
      // const privilegios = await this.privilegioRepository.find({
      //   where: { id_usuario: user.id , status: true},
      // });
      const objeto = {
        action: 'hosts',
        user: user.username,
      };
      const [datos] = await this.privilegioRepository.query(
        'CALL ver_user(?)',
        [JSON.stringify(objeto)],
      );

      const definicion = await this.definicionRepository.findOne({
        where: { id: 1 },
      });

      return { privilegios: datos, titulo: definicion.valor };
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async retornarDatosConctactos(user: User, host: string) {
    //  console.log(user)
    try {
      // const privilegios = await this.privilegioRepository.find({
      //   where: { id_usuario: user.id , status: true},
      // });
      const objeto = {
        action: 'contacto',
        user: user.username,
        host,
      };
      const [datos] = await this.privilegioRepository.query(
        'CALL ver_user(?)',
        [JSON.stringify(objeto)],
      );
      console.log(JSON.stringify(objeto));
      return { telefono: datos[0].tlf_trb, email: datos[0].email_trb };
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async retornarUsuario(id: number) {
    try {
      const user = await this.userRepository.findOne({
        select: [
          'id',
          'status',
          'nombre',
          'estado',
          'avatar',
          'username',
          'uid',
        ],
        where: [{ id }],
      });
      return user;
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async retornarTodosUsuarios(user: User) {
    try {
      const users = await this.userRepository.find({
        where: [{ id: Not(user.id) }],
      });

      users.map((user) => {
        delete user.password;
        user.chat_info = JSON.parse(user.chat_info);
        user.otros_datos = JSON.parse(user.otros_datos);
      });

      return { users };
    } catch (err) {
      this.handerDBException(err);
    }
  }
  async retornarUsuariosActivos(user: User) {
    try {
      const users = await this.userRepository.find({
        select: ['id', 'nombre', 'estado', 'avatar', 'username', 'uid'],
        where: [{ id: Not(user.id), status: true }],
      });
      return { users };
    } catch (err) {
      this.handerDBException(err);
    }
  }

  async checkAuthStatus(user: User, base: string) {
    //console.log({che:user})

    const datos = await this.retornarDatosConctactos(user, base);

    const id = user.id;
    delete user.password;
    user.email = datos.email;
    user.telefono = datos.telefono;
    user.chat_info = JSON.parse(user.chat_info);
    user.avatar = user.avatar.length === 0 ? null : user.avatar;
    delete user.id;

    return { ...user, token: this.getJwtToken({ id }) };
  }
  async unlockSession(loginUserDto: LoginUserDto, user: User) {
    //console.log({che:user})

    return await this.singIn(loginUserDto);
  }
  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
  private handerDBException(error: IErrorsTypeORM): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
