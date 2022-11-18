"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function UnauthorizedResponse(description) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiUnauthorizedResponse)({
        description,
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
exports.UnauthorizedResponse = UnauthorizedResponse;
//# sourceMappingURL=unauthorized-response.decorator.js.map