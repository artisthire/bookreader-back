import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IReadableToken } from './interfaces/readable-token.interface';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { SessionService } from 'src/session/session.service';
import { IReadableSession } from 'src/session/interfaces/readable-session.interface';
export declare class TokenService {
    private sessionService;
    private configService;
    private jwtService;
    private jwtAccessSecret;
    private jwtAccessExpiration;
    private jwtRefreshSecret;
    private jwtRefreshExpiration;
    constructor(sessionService: SessionService, configService: ConfigService, jwtService: JwtService);
    create(user: IReadableUser): Promise<IReadableToken>;
    updateAccessToken(userData: IReadableUser & IReadableSession): Promise<Pick<IReadableToken, 'access'>>;
    createToken(payload: {
        user: IReadableUser;
        sid: string;
    }, tokenOptions: JwtSignOptions): string;
}
