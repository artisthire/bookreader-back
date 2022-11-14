import { Model } from 'mongoose';
import { IReadableSession } from './interfaces/readable-session.interface';
import { SessionDocument } from './schemas/session.schema';
export declare class SessionService {
    private sessionModel;
    constructor(sessionModel: Model<SessionDocument>);
    create(): Promise<string>;
    findBySid(sid: string): Promise<IReadableSession | null>;
    remove(sid: string): Promise<boolean>;
}
