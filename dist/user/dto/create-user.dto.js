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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        minimum: 3,
        maximum: 100,
        example: 'Jhon',
    }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/[a-zа-яё 0-9]/i),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        minimum: 10,
        maximum: 63,
        format: 'email',
    }),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(63),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        minimum: 5,
        maximum: 30,
        example: 'Querty123',
    }),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.NotContains)(' '),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map