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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadableBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_book_dto_1 = require("./create-book.dto");
const update_book_review_dto_1 = require("./update-book-review.dto");
class ReadableBookDto extends (0, swagger_1.IntersectionType)(create_book_dto_1.CreateBookDto, update_book_review_dto_1.UpdateBookReviewDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DB id' }),
    __metadata("design:type", String)
], ReadableBookDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Book owner from DB' }),
    __metadata("design:type", String)
], ReadableBookDto.prototype, "owner", void 0);
exports.ReadableBookDto = ReadableBookDto;
//# sourceMappingURL=readable-book.dto.js.map