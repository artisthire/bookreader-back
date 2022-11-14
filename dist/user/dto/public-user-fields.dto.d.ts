import { IReadableUser } from '../interfaces/readable-user.interface';
export declare class PublicUserFieldsDto {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    constructor(model: IReadableUser);
}
