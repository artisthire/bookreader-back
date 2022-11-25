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
exports.CreateTrainingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_bigger_than_validator_1 = require("../validators/is-bigger-than.validator");
class CreateTrainingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Training start in Date timestamp format in ms',
        type: 'integer',
        example: 1669189469245,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTrainingDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Training finish in Date timestamp format in ms',
        type: 'integer',
        example: 1669189807258,
    }),
    (0, class_validator_1.IsInt)(),
    (0, is_bigger_than_validator_1.IsBiggerThan)('start', {
        message: `Date 'finish' must be bigger than date 'start'`,
    }),
    __metadata("design:type", Number)
], CreateTrainingDto.prototype, "finish", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Books id from DB for training',
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        uniqueItems: true,
        example: ['637b8914406b334eccdaaf6d', '637b835fc705de39f763dc5e'],
    }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateTrainingDto.prototype, "books", void 0);
exports.CreateTrainingDto = CreateTrainingDto;
//# sourceMappingURL=create-training.dto.js.map