import { CreateTrainingDto } from './create-training.dto';
import { UpdateResultDto } from './update-result.dto';
export declare class ReadableTrainingDto extends CreateTrainingDto {
    readonly _id: string;
    readonly owner: string;
    readonly results: Array<UpdateResultDto>;
}
