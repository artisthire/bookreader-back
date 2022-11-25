import { ApiProperty, IntersectionType } from '@nestjs/swagger';

import { CreateBookDto } from './create-book.dto';
import { UpdateBookReviewDto } from './update-book-review.dto';

export class ReadableBookDto extends IntersectionType(
  CreateBookDto,
  UpdateBookReviewDto
) {
  @ApiProperty({ description: 'DB id' })
  readonly _id: string;

  @ApiProperty({ description: 'Book owner from DB' })
  readonly owner: string;
}
