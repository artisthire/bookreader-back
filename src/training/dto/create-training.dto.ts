import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsInt, IsMongoId } from 'class-validator';
import { IsBiggerThan } from '../validators/is-bigger-than.validator';

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Training start in Date timestamp format in ms',
    type: 'integer',
    example: 1669189469245,
  })
  @IsInt()
  readonly start: number;

  @ApiProperty({
    description: 'Training finish in Date timestamp format in ms',
    type: 'integer',
    example: 1669189807258,
  })
  @IsInt()
  @IsBiggerThan('start', {
    message: `Date 'finish' must be bigger than date 'start'`,
  })
  readonly finish: number;

  @ApiProperty({
    description: 'Books id from DB for training',
    type: 'array',
    items: { type: 'string' },
    minItems: 1,
    uniqueItems: true,
    example: ['637b8914406b334eccdaaf6d', '637b835fc705de39f763dc5e'],
  })
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsMongoId({ each: true })
  readonly books: string[];
}
