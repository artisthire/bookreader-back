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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const token_user_fields_dto_1 = require("../user/dto/token-user-fields.dto");
const session_service_1 = require("../session/session.service");
let TokenService = class TokenService {
    constructor(sessionService, configService, jwtService) {
        this.sessionService = sessionService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.jwtAccessSecret = this.configService.get('JWT_SECRET_ACCESS');
        this.jwtAccessExpiration = this.configService.get('JWT_EXPIRATION_ACCESS');
        this.jwtRefreshSecret =
            this.configService.get('JWT_SECRET_REFRESH');
        this.jwtRefreshExpiration = this.configService.get('JWT_EXPIRATION_REFRESH');
    }
    async create(user) {
        const sid = await this.sessionService.create();
        const access = this.createToken({ user, sid }, {
            secret: this.jwtAccessSecret,
            expiresIn: this.jwtAccessExpiration,
        });
        const refresh = this.createToken({ user, sid }, {
            secret: this.jwtRefreshSecret,
            expiresIn: this.jwtRefreshExpiration,
        });
        return { access, refresh };
    }
    async updateAccessToken(userData) {
        const { sid } = userData, user = __rest(userData, ["sid"]);
        const access = this.createToken({ user, sid }, {
            secret: this.jwtAccessSecret,
            expiresIn: this.jwtAccessExpiration,
        });
        return { access };
    }
    createToken(payload, tokenOptions) {
        const { user, sid } = payload;
        const userTokenFields = new token_user_fields_dto_1.TokenUserFieldsDto(user);
        const token = this.jwtService.sign(Object.assign(Object.assign({}, userTokenFields), { sid }), Object.assign({}, tokenOptions));
        return token;
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        config_1.ConfigService,
        jwt_1.JwtService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map