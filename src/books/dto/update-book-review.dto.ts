import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, MaxLength, Min } from 'class-validator';

export class UpdateBookReviewDto {
  @ApiProperty({
    description: 'Book rating',
    type: 'integer',
    minimum: 0,
    maximum: 5,
    example: 5,
  })
  @IsInt()
  @Min(0)
  @Max(5)
  readonly rating: number;

  @ApiProperty({
    description: 'Book rewiev',
    minLength: 1,
    maxLength: 50,
    example: 'Amazing book',
  })
  @IsNotEmpty()
  @MaxLength(1000)
  readonly review: string;
}
