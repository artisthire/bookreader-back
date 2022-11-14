import { Strategy } from 'passport-jwt';
import { TokenUserFieldsDto } from 'src/user/dto/token-user-fields.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { IReadableSession } from 'src/session/interfaces/readable-session.interface';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: TokenUserFieldsDto & IReadableSession): Promise<IReadableUser & IReadableSession>;
}
export {};
