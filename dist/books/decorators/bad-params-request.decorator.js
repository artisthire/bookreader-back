"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadParamsRequest = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function BadParamsRequest(exampleMessages) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid request body',
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
                message: exampleMessages.badResp,
                statusCode: 400,
            },
        },
    }), (0, swagger_1.ApiNotFoundResponse)({
        description: 'Data not found by user or id',
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
                message: exampleMessages.notFoundResp,
                statusCode: 404,
            },
        },
    }));
}
exports.BadParamsRequest = BadParamsRequest;
//# sourceMappingURL=bad-params-request.decorator.js.map