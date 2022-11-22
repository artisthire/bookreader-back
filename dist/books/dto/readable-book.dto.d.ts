import { CreateBookDto } from './create-book.dto';
import { UpdateBookReviewDto } from './update-book-review.dto';
declare const ReadableBookDto_base: import("@nestjs/common").Type<CreateBookDto & UpdateBookReviewDto>;
export declare class ReadableBookDto extends ReadableBookDto_base {
    readonly _id: string;
    readonly owner: string;
}
export {};
