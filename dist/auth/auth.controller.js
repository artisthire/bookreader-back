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
const google_auth_guard_1 = require("./guards/google-auth.guard");
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
    async googleAuth() {
        return null;
    }
    async googleAuthRedirect(req, resp) {
        const { access, refresh } = await this.authService.loginGoogle(req.user);
        resp.redirect(`${process.env.FRONT_URL}/google-redirect?accessToken=${access}&refreshToken=${refresh}`);
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
    (0, login_response_decorator_1.LoginResponse)(201),
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
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Redirect to page google authorization' }),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    (0, common_1.HttpCode)(302),
    (0, common_1.Get)('google'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Singin user afrer google authoriazation and return access and refresh token in URL query parameters',
    }),
    (0, swagger_1.ApiProduces)('text/plain'),
    (0, swagger_1.ApiOkResponse)({
        description: `Return to fron page '/google-redirect' tokens in query parameters. Access token in 'accessToken' parameter, refresh token in 'refreshToken' parameter`,
        schema: {
            type: 'string',
            example: 'https://example.com/google-redirect/?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9D&refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV',
        },
    }),
    (0, unauthorized_response_decorator_1.UnauthorizedResponse)('Not provided email or user name from google service'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    (0, common_1.Get)('google/redirect'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map