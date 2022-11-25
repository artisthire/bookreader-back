"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMongoId = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let ValidateMongoId = class ValidateMongoId {
    transform(value) {
        if (mongodb_1.ObjectId.isValid(value)) {
            if (String(new mongodb_1.ObjectId(value)) === value) {
                return value;
            }
            throw new common_1.BadRequestException(`Invalid Mongo Id`);
        }
        throw new common_1.BadRequestException(`Invalid Mongo Id`);
    }
};
ValidateMongoId = __decorate([
    (0, common_1.Injectable)()
], ValidateMongoId);
exports.ValidateMongoId = ValidateMongoId;
//# sourceMappingURL=validate-mongo-id.pipe.js.map