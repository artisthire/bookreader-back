import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateResultDto {
  @ApiProperty({
    description: 'Date of input result in Date timestamp format in ms',
    type: 'integer',
    example: 1669189469245,
  })
  @IsInt()
  readonly date: number;

  @ApiProperty({
    description: 'Count of pages',
    type: 'integer',
    minimum: 1,
    example: 20,
  })
  @IsInt()
  @Min(1)
  readonly pages: number;
}
