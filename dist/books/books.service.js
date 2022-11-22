"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const book_schema_1 = require("./schemas/book.schema");
let BooksService = class BooksService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async create(createBookDto, user) {
        const { title, author } = createBookDto;
        const existBook = await this.bookModel.findOne({
            owner: user._id,
            title,
            author,
        });
        if (existBook) {
            throw new common_1.ConflictException(`Book '${title} - ${author}' existed`);
        }
        const book = await this.bookModel.create(Object.assign(Object.assign({}, createBookDto), { owner: user._id }));
        return await book.populate('owner', 'name email');
    }
    async findAllByOwner(user) {
        const books = await this.bookModel.find({ owner: user._id }).lean();
        if (!books || !books.length) {
            throw new common_1.NotFoundException('Books not found');
        }
        return books;
    }
    async updateStatus(id, user, statusData) {
        const { status } = statusData;
        const book = await this.bookModel
            .findOneAndUpdate({ _id: id, owner: user._id }, { status }, { new: true })
            .lean();
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    async updateReview(id, user, reviewData) {
        const { rating, review } = reviewData;
        const book = await this.bookModel
            .findOneAndUpdate({ _id: id, owner: user._id }, { rating, review }, { new: true })
            .lean();
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    async removeOne(id, user) {
        const book = await this.bookModel
            .findOneAndDelete({ _id: id, owner: user._id })
            .lean();
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map