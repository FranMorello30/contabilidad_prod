import { Inject, Injectable } from '@nestjs/common';
import { TENANT_CONNECTION } from 'src/core/host.module';

import { DataSource } from 'typeorm';
import { User } from '../auth/entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { Search } from './entities/search.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly config: ConfigService,
    @Inject(TENANT_CONNECTION) private connection,
  ) {}

  async busqueda(termino: string, base: string) {
    console.log(base);

    //const repository = await this.connection.getRepository(User);
    // const result = await repository
    //   .createQueryBuilder('clientes')
    //   .select([
    //     'clientes.cli_id_fiscal, clientes.cli_razon_social, clientes.cli_tlf_contacto, clientes.cli_email_contacto',
    //   ])
    //   .where(
    //     `clientes.cli_id_fiscal LIKE :value ` +
    //       `OR clientes.cli_razon_social LIKE :value ` +
    //       `OR clientes.cli_tlf_contacto LIKE :value ` +
    //       `OR clientes.cli_email_contacto LIKE :value `,
    //   )
    //   .setParameter('value', `%${termino}%`)
    //   .getManyAndCount();

    // const resp = result[0].map((data) => ({ ...data }));

    return { result: [] };
  }
}
