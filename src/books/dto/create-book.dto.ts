import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { BookStatus } from '../types/book-status.type';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book title',
    minLength: 1,
    maxLength: 50,
    example: 'Typescript handbook',
  })
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @ApiProperty({
    description: 'Book author',
    minLength: 1,
    maxLength: 50,
    example: 'Jhon Alexander',
  })
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/\D/)
  readonly author: string;

  @ApiPropertyOptional({
    description: 'Book publication year',
    type: 'integer',
    minimum: 1000,
    maximum: new Date().getFullYear(),
    example: 2022,
  })
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  readonly pubYear: number;

  @ApiProperty({
    description: 'Book pages count',
    type: 'integer',
    minimum: 1,
    maximum: 9999,
    example: 100,
  })
  @IsInt()
  @Min(1)
  @Max(9999)
  readonly countOfPages: number;

  @ApiPropertyOptional({
    description: 'Book status',
    enum: BookStatus,
    example: 'reading',
    default: 'pending',
  })
  @IsEnum(BookStatus)
  readonly status: BookStatus;
}
