"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedAuth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function UnauthorizedAuth() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid token, not found user or active session',
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
                message: 'Unauthorized',
                statusCode: 401,
            },
        },
    }));
}
exports.UnauthorizedAuth = UnauthorizedAuth;
//# sourceMappingURL=unauthorized-auth.decorator.js.map