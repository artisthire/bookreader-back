"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const readable_token_dto_1 = require("../../token/dto/readable-token.dto");
const public_user_fields_dto_1 = require("../../user/dto/public-user-fields.dto");
const unauthorized_response_decorator_1 = require("./unauthorized-response.decorator");
function LoginResponse(status) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(readable_token_dto_1.ReadableTokenDto), (0, swagger_1.ApiResponse)({
        status,
        schema: {
            allOf: [
                {
                    type: 'object',
                    properties: {
                        user: {
                            $ref: (0, swagger_1.getSchemaPath)(public_user_fields_dto_1.PublicUserFieldsDto),
                        },
                    },
                },
                {
                    $ref: (0, swagger_1.getSchemaPath)(readable_token_dto_1.ReadableTokenDto),
                },
            ],
        },
    }), (0, unauthorized_response_decorator_1.UnauthorizedResponse)('Invalid login data'));
}
exports.LoginResponse = LoginResponse;
//# sourceMappingURL=login-response.decorator.js.map