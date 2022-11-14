import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export declare type TokenDocument = Token & Document;
export declare class Token {
    readonly owner: User;
    access: string;
    refresh: string;
}
export declare const TokenSchema: mongoose.Schema<Token, mongoose.Model<Token, any, any, any, any>, {}, {}, {}, {}, "type", Token>;
