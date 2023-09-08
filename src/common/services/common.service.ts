import { DataSource } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  private readonly logger = new Logger('CommonService');
  constructor(private readonly dataSource: DataSource) {}

  public async badRequest(modulo: string, mensaje: string, error: any) {
    this.logger.error(error);
    // await this.dataSource.query('CALL error_ecert(?)', [
    //   JSON.stringify({
    //     modulo,
    //     error,
    //   }),
    // ]);

    //throw new InternalServerErrorException(mensaje);
    //throw new NotFoundException(mensaje);
    throw new BadRequestException(mensaje);
  }
  public async internalRequest(modulo: string, mensaje: string, error: any) {
    this.logger.error(error);
    // await this.dataSource.query('CALL error_ecert(?)', [
    //   JSON.stringify({
    //     modulo,
    //     error,
    //   }),
    // ]);

    //throw new InternalServerErrorException(mensaje);
    //throw new NotFoundException(mensaje);
    throw new BadRequestException(mensaje);
  }
}
