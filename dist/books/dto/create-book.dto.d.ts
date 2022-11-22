import { BookStatus } from '../types/book-status.type';
export declare class CreateBookDto {
    readonly title: string;
    readonly author: string;
    readonly pubYear: number;
    readonly countOfPages: number;
    readonly status: BookStatus;
}
