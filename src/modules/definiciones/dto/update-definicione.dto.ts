import { PartialType } from '@nestjs/mapped-types';
import { CreateDefinicioneDto } from './create-definicione.dto';

export class UpdateDefinicioneDto extends PartialType(CreateDefinicioneDto) {}
