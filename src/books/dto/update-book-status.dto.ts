import { PickType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookStatusDto extends PickType(CreateBookDto, [
  'status',
] as const) {}
