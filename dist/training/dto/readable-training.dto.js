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
exports.ReadableTrainingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_training_dto_1 = require("./create-training.dto");
const update_result_dto_1 = require("./update-result.dto");
class ReadableTrainingDto extends create_training_dto_1.CreateTrainingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DB id' }),
    __metadata("design:type", String)
], ReadableTrainingDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training owner from DB' }),
    __metadata("design:type", String)
], ReadableTrainingDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training results', type: [update_result_dto_1.UpdateResultDto] }),
    __metadata("design:type", Array)
], ReadableTrainingDto.prototype, "results", void 0);
exports.ReadableTrainingDto = ReadableTrainingDto;
//# sourceMappingURL=readable-training.dto.js.map