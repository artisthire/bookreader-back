import { Model } from 'mongoose';
import { BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';
import { ReadableBookDto } from './dto/readable-book.dto';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<BookDocument>);
    create(createBookDto: CreateBookDto, user: IReadableUser): Promise<ReadableBookDto>;
    findAllByOwner(user: IReadableUser): Promise<ReadableBookDto[]>;
    updateStatus(id: string, user: IReadableUser, statusData: UpdateBookStatusDto): Promise<ReadableBookDto>;
    updateReview(id: string, user: IReadableUser, reviewData: UpdateBookReviewDto): Promise<ReadableBookDto>;
    removeOne(id: string, user: IReadableUser): Promise<ReadableBookDto>;
}
