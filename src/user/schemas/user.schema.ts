import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  readonly name: string;

  @Prop({ required: true, index: true, unique: true })
  readonly email: string;

  @Prop({ required: true })
  readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
