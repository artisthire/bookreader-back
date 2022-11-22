import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, MaxLength, Min } from 'class-validator';

export class UpdateBookReviewDto {
  @ApiProperty({
    description: 'Book rating',
    minimum: 0,
    maximum: 5,
    example: 5,
  })
  @Min(0)
  @Max(5)
  readonly rating: number;

  @ApiProperty({
    description: 'Book rewiev',
    minimum: 1,
    maximum: 50,
    example: 'Amazing book',
  })
  @IsNotEmpty()
  @MaxLength(1000)
  readonly review: string;
}
