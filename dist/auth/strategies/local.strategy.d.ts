import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<IReadableUser>;
}
export {};
