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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const login_user_dto_1 = require("../user/dto/login-user.dto");
const auth_service_1 = require("./auth.service");
const login_response_decorator_1 = require("./decorators/login-response.decorator");
const public_decorator_1 = require("./decorators/public.decorator");
const unauthorized_response_decorator_1 = require("./decorators/unauthorized-response.decorator");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const local_auth_guard_1 = require("./guards/local-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return await this.authService.login(req.user);
    }
    async register(createUserDto) {
        return await this.authService.register(createUserDto);
    }
    async logout(req) {
        await this.authService.logout(req.user.sid);
        return { message: 'Logout success' };
    }
    async refresh(req) {
        return await this.authService.refreshAccessToken(req.user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Login user' }),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDto }),
    (0, login_response_decorator_1.LoginResponse)(200),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Register user' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, login_response_decorator_1.LoginResponse)(201),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Parameter missing',
        schema: {
            type: 'object',
            required: ['message', 'statusCode'],
            properties: {
                message: {
                    type: 'string[]',
                },
                statusCode: {
                    type: 'integer',
                },
            },
            example: {
                message: ['password must be longer than or equal to 5 characters'],
                statusCode: 400,
            },
        },
    }),
    (0, common_1.Post)('register'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Logout' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('logout'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'WARNING. Expected authorization header with REFRESH token',
        description: 'Return access token',
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                access: {
                    type: 'string',
                },
            },
        },
    }),
    (0, unauthorized_response_decorator_1.UnauthorizedResponse)('Invalid login data'),
    (0, swagger_1.ApiBearerAuth)('refresh'),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Get)('refresh'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map