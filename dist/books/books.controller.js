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
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_user_fields_dto_1 = require("../user/dto/public-user-fields.dto");
const books_service_1 = require("./books.service");
const bad_params_response_decorator_1 = require("./decorators/bad-params-response.decorator");
const create_book_dto_1 = require("./dto/create-book.dto");
const readable_book_dto_1 = require("./dto/readable-book.dto");
const update_book_review_dto_1 = require("./dto/update-book-review.dto");
const update_book_status_dto_1 = require("./dto/update-book-status.dto");
const unauthorized_response_decorator_1 = require("../auth/decorators/unauthorized-response.decorator");
const validate_mongo_id_pipe_1 = require("./pipes/validate-mongo-id.pipe");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async create(createBookDto, req) {
        return await this.booksService.create(createBookDto, req.user);
    }
    async findAll(req) {
        return await this.booksService.findAllByOwner(req.user);
    }
    async updateStatus(id, updateBookStatusDto, req) {
        return await this.booksService.updateStatus(id, req.user, updateBookStatusDto);
    }
    async updateReview(id, updateBookReviewDto, req) {
        return await this.booksService.updateReview(id, req.user, updateBookReviewDto);
    }
    async remove(id, req) {
        return await this.booksService.removeOne(id, req.user);
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Book created',
        schema: {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(readable_book_dto_1.ReadableBookDto),
                },
                {
                    type: 'object',
                    properties: {
                        owner: {
                            $ref: (0, swagger_1.getSchemaPath)(public_user_fields_dto_1.PublicUserFieldsDto),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Book with current name and title existed',
        schema: {
            type: 'object',
            required: ['message', 'statusCode'],
            properties: {
                message: {
                    type: 'string',
                },
                statusCode: {
                    type: 'integer',
                },
            },
            example: {
                message: `Book 'Typescript handbook - Jhon Alexander' existed`,
                statusCode: 409,
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ description: 'Create book' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Books not found',
        schema: {
            type: 'object',
            required: ['message', 'statusCode'],
            properties: {
                message: {
                    type: 'string',
                },
                statusCode: {
                    type: 'integer',
                },
            },
            example: {
                message: 'Book not found',
                statusCode: 404,
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'All books by owner',
        type: [readable_book_dto_1.ReadableBookDto],
    }),
    (0, swagger_1.ApiOperation)({ description: 'Find all books by owner' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, bad_params_response_decorator_1.BadParamsResponse)({
        badResp: 'status must be a valid enum value',
        notFoundResp: 'Book not found',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Book with updated status',
        type: readable_book_dto_1.ReadableBookDto,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Update book status' }),
    (0, common_1.Patch)('status/:id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_status_dto_1.UpdateBookStatusDto, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updateStatus", null);
__decorate([
    (0, bad_params_response_decorator_1.BadParamsResponse)({
        badResp: 'review should not be empty',
        notFoundResp: 'Book not found',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Book with updated review and rating',
        type: readable_book_dto_1.ReadableBookDto,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Update book review and rating' }),
    (0, common_1.Patch)('review/:id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_review_dto_1.UpdateBookReviewDto, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updateReview", null);
__decorate([
    (0, bad_params_response_decorator_1.BadParamsResponse)({
        badResp: `Invalid parameter 'id'`,
        notFoundResp: 'Book not found',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Deleted book',
        type: readable_book_dto_1.ReadableBookDto,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Remove book by id' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoId)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "remove", null);
BooksController = __decorate([
    (0, swagger_1.ApiTags)('books'),
    (0, unauthorized_response_decorator_1.UnauthorizedResponse)('Invalid login data'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map