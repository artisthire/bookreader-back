import mongoose, { Document } from 'mongoose';
import { BookStatus } from '../types/book-status.type';
export declare type BookDocument = Book & Document;
export declare class Book {
    readonly title: string;
    readonly author: string;
    readonly pubYear: number;
    readonly countOfPages: number;
    readonly status: BookStatus;
    readonly owner: string;
    readonly rating: number;
    readonly review: string;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, any>, {}, {}, {}, {}, "type", Book>;
