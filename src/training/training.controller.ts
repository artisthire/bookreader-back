import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { TrainingService } from './training.service';
import { ValidateUserRequest } from 'src/auth/interfaces/validate-user-request.interface';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UnauthorizedResponse } from 'src/auth/decorators/unauthorized-response.decorator';
import { ReadableTrainingDto } from './dto/readable-training.dto';
import { BadParamsRequest } from 'src/books/decorators/bad-params-request.decorator';
import { UpdateResultDto } from './dto/update-result.dto';
import { PublicUserFieldsDto } from 'src/user/dto/public-user-fields.dto';

@ApiTags('training')
@UnauthorizedResponse('Unauthorized request')
@ApiBearerAuth()
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @BadParamsRequest({
    badResp: 'Finish date must be bigeer than start date minimum for 1 day',
    notFoundResp: 'Not found book in DB',
  })
  @ApiCreatedResponse({
    description: 'Training created',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ReadableTrainingDto),
        },
        {
          type: 'object',
          properties: {
            owner: {
              $ref: getSchemaPath(PublicUserFieldsDto),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ description: 'Create training' })
  @Post()
  async create(
    @Body() createTrainingDto: CreateTrainingDto,
    @Request() req: ValidateUserRequest
  ) {
    return await this.trainingService.create(createTrainingDto, req.user);
  }

  @ApiNotFoundResponse({
    description: 'Training not found',
    schema: {
      type: 'object',
      required: ['message', 'statusCode'],
      properties: {
        message: {
          type: 'string',
        },
        statusCode: {
          type: 'integer',
        },
      },
      example: {
        message: 'Training not found',
        statusCode: 404,
      },
    },
  })
  @ApiOkResponse({
    description: 'Training by owner',
    type: ReadableTrainingDto,
  })
  @ApiOperation({ description: 'Find training by owner' })
  @Get()
  async find(@Request() req: ValidateUserRequest) {
    return await this.trainingService.findByOwner(req.user);
  }

  @BadParamsRequest({
    badResp: 'Date of result must be bigger than date start training',
    notFoundResp: 'Training not found',
  })
  @ApiOkResponse({
    description: 'Training with updated results array',
    type: ReadableTrainingDto,
  })
  @ApiOperation({ description: 'Add result to training data' })
  @Patch('results')
  async updateResults(
    @Body() updateResultDto: UpdateResultDto,
    @Request() req: ValidateUserRequest
  ) {
    return await this.trainingService.addResult(updateResultDto, req.user);
  }
}
