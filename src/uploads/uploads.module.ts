import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports: [AuthModule,ConfigModule, CommonModule],
})
export class UploadsModule {}
