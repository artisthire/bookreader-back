import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IReadableUser } from './interfaces/readable-user.interface';
import { UserDocument } from './schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    find(id: string): Promise<IReadableUser | null>;
    findByEmail(email: string): Promise<IReadableUser | null>;
    update(id: string, data: Partial<IReadableUser>): Promise<boolean>;
    create(createUserDto: CreateUserDto): Promise<IReadableUser | null>;
}
