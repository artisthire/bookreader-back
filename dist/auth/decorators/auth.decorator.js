"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedAuth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function UnauthorizedAuth() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }));
}
exports.UnauthorizedAuth = UnauthorizedAuth;
//# sourceMappingURL=auth.decorator.js.map