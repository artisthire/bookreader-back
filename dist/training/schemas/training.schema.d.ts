import mongoose, { Document } from 'mongoose';
import { UpdateResultDto } from '../dto/update-result.dto';
export declare type TrainingDocument = Training & Document;
export declare class Training {
    readonly start: number;
    readonly finish: number;
    readonly books: string[];
    readonly results: Array<UpdateResultDto>;
    readonly owner: string;
}
export declare const TrainingSchema: mongoose.Schema<Training, mongoose.Model<Training, any, any, any, any>, {}, {}, {}, {}, "type", Training>;
