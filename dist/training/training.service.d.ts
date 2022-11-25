import { Model } from 'mongoose';
import { TrainingDocument } from './schemas/training.schema';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { CreateTrainingDto } from './dto/create-training.dto';
import { ReadableTrainingDto } from './dto/readable-training.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { BooksService } from 'src/books/books.service';
export declare class TrainingService {
    private trainingModel;
    private booksService;
    constructor(trainingModel: Model<TrainingDocument>, booksService: BooksService);
    create(createTrainingDto: CreateTrainingDto, user: IReadableUser): Promise<ReadableTrainingDto>;
    findByOwner(user: IReadableUser): Promise<ReadableTrainingDto>;
    addResult(updateResultDto: UpdateResultDto, user: IReadableUser): Promise<ReadableTrainingDto>;
}
