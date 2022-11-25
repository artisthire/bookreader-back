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
exports.UpdateResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateResultDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of input result in Date timestamp format in ms',
        type: 'integer',
        example: 1669189469245,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateResultDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Count of pages',
        type: 'integer',
        minimum: 1,
        example: 20,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateResultDto.prototype, "pages", void 0);
exports.UpdateResultDto = UpdateResultDto;
//# sourceMappingURL=update-result.dto.js.map