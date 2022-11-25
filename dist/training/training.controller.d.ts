import { TrainingService } from './training.service';
import { ValidateUserRequest } from 'src/auth/interfaces/validate-user-request.interface';
import { CreateTrainingDto } from './dto/create-training.dto';
import { ReadableTrainingDto } from './dto/readable-training.dto';
import { UpdateResultDto } from './dto/update-result.dto';
export declare class TrainingController {
    private readonly trainingService;
    constructor(trainingService: TrainingService);
    create(createTrainingDto: CreateTrainingDto, req: ValidateUserRequest): Promise<ReadableTrainingDto>;
    find(req: ValidateUserRequest): Promise<ReadableTrainingDto>;
    updateResults(updateResultDto: UpdateResultDto, req: ValidateUserRequest): Promise<ReadableTrainingDto>;
}
