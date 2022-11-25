import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { UpdateResultDto } from '../dto/update-result.dto';

export type TrainingDocument = Training & Document;

@Schema({ versionKey: false, timestamps: true })
export class Training {
  @Prop({ required: true })
  readonly start: number;

  @Prop({ required: true })
  readonly finish: number;

  @Prop({ required: true })
  readonly books: string[];

  @Prop({ default: [] })
  readonly results: Array<UpdateResultDto>;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly owner: string;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
