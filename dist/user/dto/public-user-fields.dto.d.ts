import { IReadableUser } from '../interfaces/readable-user.interface';
import { CreateUserDto } from './create-user.dto';
declare const PublicUserFieldsDto_base: import("@nestjs/common").Type<Omit<CreateUserDto, "password">>;
export declare class PublicUserFieldsDto extends PublicUserFieldsDto_base {
    readonly _id: string;
    constructor(model: IReadableUser);
}
export {};
