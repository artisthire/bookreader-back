import { Response } from 'express';
import { Profile } from 'passport-google-oauth20';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { AuthService } from './auth.service';
import { ValidateUserRequest } from './interfaces/validate-user-request.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: {
        user: IReadableUser;
    }): Promise<{
        user: import("../user/dto/public-user-fields.dto").PublicUserFieldsDto;
    } & import("../token/interfaces/readable-token.interface").IReadableToken>;
    register(createUserDto: CreateUserDto): Promise<{
        user: import("../user/dto/public-user-fields.dto").PublicUserFieldsDto;
    } & import("../token/interfaces/readable-token.interface").IReadableToken>;
    logout(req: ValidateUserRequest): Promise<{
        message: string;
    }>;
    refresh(req: ValidateUserRequest): Promise<Pick<import("../token/interfaces/readable-token.interface").IReadableToken, "access">>;
    googleAuth(): Promise<null>;
    googleAuthRedirect(req: {
        user: Profile;
    }, resp: Response): Promise<void>;
}
