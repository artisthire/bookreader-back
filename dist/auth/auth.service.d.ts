import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { PublicUserFieldsDto } from 'src/user/dto/public-user-fields.dto';
import { SessionService } from 'src/session/session.service';
import { IReadableSession } from 'src/session/interfaces/readable-session.interface';
import { IReadableToken } from 'src/token/interfaces/readable-token.interface';
import { TokenUserFieldsDto } from 'src/user/dto/token-user-fields.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthService {
    private userService;
    private tokenService;
    private sessionService;
    private readonly saltRounds;
    constructor(userService: UserService, tokenService: TokenService, sessionService: SessionService);
    login(user: IReadableUser): Promise<{
        user: PublicUserFieldsDto;
    } & IReadableToken>;
    logout(sid: string): Promise<void>;
    register(createUserDto: CreateUserDto): Promise<{
        user: PublicUserFieldsDto;
    } & IReadableToken>;
    refreshAccessToken(userData: IReadableUser & IReadableSession): Promise<Pick<IReadableToken, 'access'>>;
    validateUser(userData: LoginUserDto): Promise<IReadableUser | null>;
    validateTokenPayload(payload: TokenUserFieldsDto & IReadableSession): Promise<IReadableUser & IReadableSession>;
}
