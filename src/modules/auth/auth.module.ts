/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';
import { Privilegios } from './entities/privilegios';
import { Definiciones } from './entities/definicione.entity';
import { Chat } from './entities/chat.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwStrategy],
  imports: [
    TypeOrmModule.forFeature([User, Privilegios, Definiciones, Chat]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    CommonModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '8h',
          },
        };
      },
    }),
  ],
  exports: [JwStrategy, TypeOrmModule, PassportModule, JwtModule, ConfigModule, AuthService],
})
export class AuthModule {}
