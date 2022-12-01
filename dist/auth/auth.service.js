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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
const user_service_1 = require("../user/user.service");
const token_service_1 = require("../token/token.service");
const public_user_fields_dto_1 = require("../user/dto/public-user-fields.dto");
const session_service_1 = require("../session/session.service");
let AuthService = class AuthService {
    constructor(userService, tokenService, sessionService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.sessionService = sessionService;
        this.saltRounds = 10;
    }
    async login(user) {
        const { access, refresh } = await this.tokenService.create(user);
        const userData = new public_user_fields_dto_1.PublicUserFieldsDto(user);
        return { user: Object.assign({}, userData), access, refresh };
    }
    async logout(sid) {
        await this.sessionService.remove(sid);
    }
    async register(createUserDto) {
        const hashPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
        const user = await this.userService.create(Object.assign(Object.assign({}, createUserDto), { password: hashPassword }));
        if (!user) {
            throw new common_1.ConflictException('Email in use');
        }
        return await this.login(user);
    }
    async loginGoogle(googleUser) {
        const { email, name } = googleUser._json;
        if (!email || !name) {
            throw new common_1.UnauthorizedException('Not provided email or user name');
        }
        const user = await this.userService.findByEmail(email);
        if (user) {
            const { access, refresh } = await this.login(user);
            return { access, refresh };
        }
        const newUser = { email, name, password: (0, uuid_1.v4)() };
        const { access, refresh } = await this.register(newUser);
        return { access, refresh };
    }
    async refreshAccessToken(userData) {
        return await this.tokenService.updateAccessToken(userData);
    }
    async validateUser(userData) {
        const { email, password } = userData;
        const user = await this.userService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
    async validateTokenPayload(payload) {
        const user = await this.userService.find(payload._id);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isActiveSession = Boolean(await this.sessionService.findBySid(payload.sid));
        if (!isActiveSession) {
            throw new common_1.UnauthorizedException('Active session not found');
        }
        return Object.assign(Object.assign({}, user), { sid: payload.sid });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService,
        session_service_1.SessionService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map