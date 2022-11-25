import { ApiProperty } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';
import { UpdateResultDto } from './update-result.dto';

export class ReadableTrainingDto extends CreateTrainingDto {
  @ApiProperty({ description: 'DB id' })
  readonly _id: string;

  @ApiProperty({ description: 'Training owner from DB' })
  readonly owner: string;

  @ApiProperty({ description: 'Training results', type: [UpdateResultDto] })
  readonly results: Array<UpdateResultDto>;
}
