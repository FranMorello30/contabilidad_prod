import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { HostModule } from 'src/core/host.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Search } from './entities/search.entity';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [AuthModule, HostModule, TypeOrmModule.forFeature([Search])],
})
export class SearchModule {}
