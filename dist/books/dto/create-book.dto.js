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
exports.CreateBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const book_status_type_1 = require("../types/book-status.type");
class CreateBookDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Book title',
        minLength: 1,
        maxLength: 50,
        example: 'Typescript handbook',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Book author',
        minLength: 1,
        maxLength: 50,
        example: 'Jhon Alexander',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/\D/),
    __metadata("design:type", String)
], CreateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Book publication year',
        type: 'integer',
        minimum: 1000,
        maximum: new Date().getFullYear(),
        example: 2022,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1000),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "pubYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Book pages count',
        type: 'integer',
        minimum: 1,
        maximum: 9999,
        example: 100,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(9999),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "countOfPages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Book status',
        enum: book_status_type_1.BookStatus,
        example: 'reading',
        default: 'pending',
    }),
    (0, class_validator_1.IsEnum)(book_status_type_1.BookStatus),
    __metadata("design:type", String)
], CreateBookDto.prototype, "status", void 0);
exports.CreateBookDto = CreateBookDto;
//# sourceMappingURL=create-book.dto.js.map