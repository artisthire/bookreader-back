import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';
import { ReadableBookDto } from './dto/readable-book.dto';
import { NoContentException } from './exceptions/no-content.exception';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(
    createBookDto: CreateBookDto,
    user: IReadableUser
  ): Promise<ReadableBookDto> {
    const { title, author } = createBookDto;
    const existBook = await this.bookModel.findOne({
      owner: user._id,
      title,
      author,
    });

    if (existBook) {
      throw new ConflictException(`Book '${title} - ${author}' existed`);
    }

    const book = await this.bookModel.create({
      ...createBookDto,
      owner: user._id,
    });

    return await book.populate('owner', 'name email');
  }

  async findAllByOwner(user: IReadableUser): Promise<ReadableBookDto[]> {
    const books = await this.bookModel.find({ owner: user._id }).lean();

    if (!books || !books.length) {
      throw new NoContentException();
    }

    return books;
  }

  async updateStatus(
    id: string,
    user: IReadableUser,
    statusData: UpdateBookStatusDto
  ): Promise<ReadableBookDto> {
    const { status } = statusData;

    const book = await this.bookModel
      .findOneAndUpdate({ _id: id, owner: user._id }, { status }, { new: true })
      .lean();

    if (!book) {
      throw new NoContentException();
    }

    return book;
  }

  async updateReview(
    id: string,
    user: IReadableUser,
    reviewData: UpdateBookReviewDto
  ): Promise<ReadableBookDto> {
    const { rating, review } = reviewData;

    const book = await this.bookModel
      .findOneAndUpdate(
        { _id: id, owner: user._id },
        { rating, review },
        { new: true }
      )
      .lean();

    if (!book) {
      throw new NoContentException();
    }

    return book;
  }

  async removeOne(id: string, user: IReadableUser): Promise<ReadableBookDto> {
    const book = await this.bookModel
      .findOneAndDelete({ _id: id, owner: user._id })
      .lean();

    if (!book) {
      throw new NoContentException();
    }

    return book;
  }
}
