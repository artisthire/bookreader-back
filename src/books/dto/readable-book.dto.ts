import { ApiProperty, IntersectionType } from '@nestjs/swagger';

import { CreateBookDto } from './create-book.dto';
import { UpdateBookReviewDto } from './update-book-review.dto';

export class ReadableBookDto extends IntersectionType(
  CreateBookDto,
  UpdateBookReviewDto
) {
  @ApiProperty({ description: 'MongoDB id' })
  readonly _id: string;

  @ApiProperty({ description: 'Book owner MongoDB id' })
  readonly owner: string;
}
