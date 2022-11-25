import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { Training, TrainingSchema } from './schemas/training.schema';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Training.name, schema: TrainingSchema },
    ]),
    BooksModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
