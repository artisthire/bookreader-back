import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ versionKey: false, timestamps: true })
export class Session {
  @Prop({ required: true, index: true, unique: true })
  readonly sid: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
