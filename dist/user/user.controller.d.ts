import { IReadableUser } from './interfaces/readable-user.interface';
export declare class UserController {
    getProfile(req: {
        user: IReadableUser;
    }): {
        _id: string;
        name: string;
        email: string;
    };
}
