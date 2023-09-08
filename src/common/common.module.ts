import { Module, ParseFilePipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Helpers } from './helpers/helpers';
import { CommonService } from './services/common.service';

@Module({
  providers: [CommonService, Helpers],
  exports: [CommonService, Helpers],
  imports: [ConfigModule],
})
export class CommonModule {}
