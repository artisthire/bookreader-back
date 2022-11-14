import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v1 as uuidv1 } from 'uuid';
import { IReadableSession } from './interfaces/readable-session.interface';

import { Session, SessionDocument } from './schemas/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>
  ) {}

  async create(): Promise<string> {
    const { sid } = await this.sessionModel.create({ sid: uuidv1() });
    return sid;
  }

  async findBySid(sid: string): Promise<IReadableSession | null> {
    return await this.sessionModel.findOne({ sid });
  }

  async remove(sid: string): Promise<boolean> {
    return Boolean(await this.sessionModel.findOneAndDelete({ sid }).exec());
  }
}
