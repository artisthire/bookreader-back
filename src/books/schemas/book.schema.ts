import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { BookStatus } from '../types/book-status.type';

export type BookDocument = Book & Document;

@Schema({ versionKey: false, timestamps: true })
export class Book {
  @Prop({ required: true })
  readonly title: string;

  @Prop({ required: true })
  readonly author: string;

  @Prop({ default: null })
  readonly pubYear: number;

  @Prop({ required: true })
  readonly countOfPages: number;

  @Prop({ default: BookStatus.pending, enum: BookStatus })
  readonly status: BookStatus;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly owner: string;

  @Prop({ default: 0 })
  readonly rating: number;

  @Prop({ default: '' })
  readonly review: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
