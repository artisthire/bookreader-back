import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Training, TrainingDocument } from './schemas/training.schema';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { CreateTrainingDto } from './dto/create-training.dto';
import { ReadableTrainingDto } from './dto/readable-training.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
    private booksService: BooksService
  ) {}

  async create(
    createTrainingDto: CreateTrainingDto,
    user: IReadableUser
  ): Promise<ReadableTrainingDto> {
    const { books, start, finish } = createTrainingDto;
    const booksIdByOwner = (await this.booksService.findAllByOwner(user)).map(
      book => book._id.toString()
    );

    const notExistInBooksDB = books.filter(id => !booksIdByOwner.includes(id));

    if (notExistInBooksDB?.length) {
      throw new NotFoundException(
        `Not found books id: ${notExistInBooksDB.join(', ')}`
      );
    }

    const startDate = new Date(start);

    if (
      new Date(startDate.setDate(startDate.getDate() + 1)).getTime() >= finish
    ) {
      throw new BadRequestException(
        'Finish date must be bigger than start date minimum for 1 day'
      );
    }

    // remove previous training`s data
    await this.trainingModel.findOneAndRemove({ owner: user._id });

    const training = await this.trainingModel.create({
      ...createTrainingDto,
      owner: user._id,
    });

    return await training.populate('owner', 'name email');
  }

  async findByOwner(user: IReadableUser): Promise<ReadableTrainingDto> {
    const training = await this.trainingModel
      .findOne({ owner: user._id })
      .lean();

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    return training;
  }

  async addResult(
    updateResultDto: UpdateResultDto,
    user: IReadableUser
  ): Promise<ReadableTrainingDto> {
    const training = (await this.trainingModel.findOne({
      owner: user._id,
    })) as TrainingDocument;

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    const { start, finish } = training;
    const { date } = updateResultDto;

    if (date < start) {
      throw new BadRequestException(
        'Date of result must be bigger than date start training'
      );
    }

    if (date > finish) {
      throw new BadRequestException(
        'Date of result must be less than date finish training'
      );
    }

    training.results.push({ ...updateResultDto });
    await training.save();

    return training as ReadableTrainingDto;
  }
}
