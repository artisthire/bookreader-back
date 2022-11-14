import { IReadableSession } from 'src/session/interfaces/readable-session.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private refreshTokenName;
    constructor(authService: AuthService);
    login(req: {
        user: IReadableUser;
    }): Promise<{
        user: import("../user/dto/public-user-fields.dto").PublicUserFieldsDto;
    } & import("../token/interfaces/readable-token.interface").IReadableToken>;
    register(createUserDto: CreateUserDto): Promise<{
        user: import("../user/dto/public-user-fields.dto").PublicUserFieldsDto;
    } & import("../token/interfaces/readable-token.interface").IReadableToken>;
    logout(req: {
        user: IReadableUser & IReadableSession;
    }): Promise<{
        message: string;
    }>;
    refresh(req: {
        user: IReadableUser & IReadableSession;
    }): Promise<Pick<import("../token/interfaces/readable-token.interface").IReadableToken, "access">>;
}
