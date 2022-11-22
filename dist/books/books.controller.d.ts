import { ValidateUserRequest } from 'src/auth/interfaces/validate-user-request.interface';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ReadableBookDto } from './dto/readable-book.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto, req: ValidateUserRequest): Promise<ReadableBookDto>;
    findAll(req: ValidateUserRequest): Promise<ReadableBookDto[]>;
    updateStatus(id: string, updateBookStatusDto: UpdateBookStatusDto, req: ValidateUserRequest): Promise<ReadableBookDto>;
    updateReview(id: string, updateBookReviewDto: UpdateBookReviewDto, req: ValidateUserRequest): Promise<ReadableBookDto>;
    remove(id: string, req: ValidateUserRequest): Promise<ReadableBookDto>;
}
