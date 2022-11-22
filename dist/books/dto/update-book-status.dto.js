"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_book_dto_1 = require("./create-book.dto");
class UpdateBookStatusDto extends (0, swagger_1.PickType)(create_book_dto_1.CreateBookDto, [
    'status',
]) {
}
exports.UpdateBookStatusDto = UpdateBookStatusDto;
//# sourceMappingURL=update-book-status.dto.js.map