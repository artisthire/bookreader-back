import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { ValidateUserRequest } from 'src/auth/interfaces/validate-user-request.interface';
import { PublicUserFieldsDto } from 'src/user/dto/public-user-fields.dto';
import { BooksService } from './books.service';
import { BadParamsRequest } from './decorators/bad-params-request.decorator';
import { CreateBookDto } from './dto/create-book.dto';
import { ReadableBookDto } from './dto/readable-book.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
import { UnauthorizedResponse } from 'src/auth/decorators/unauthorized-response.decorator';
import { ValidateMongoId } from './pipes/validate-mongo-id.pipe';

@ApiTags('books')
@UnauthorizedResponse('Unauthorized request')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBadRequestResponse({
    description: 'Invalid request body',
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
        message: 'Title must be not empty',
        statusCode: 400,
      },
    },
  })
  @ApiConflictResponse({
    description: 'Book with current name and title existed',
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
        message: `Book 'Typescript handbook - Jhon Alexander' existed`,
        statusCode: 409,
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Book created',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ReadableBookDto),
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
  @ApiOperation({ description: 'Create book' })
  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
    @Request() req: ValidateUserRequest
  ) {
    return await this.booksService.create(createBookDto, req.user);
  }

  @ApiNoContentResponse({
    description: 'Books not found',
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
        message: 'Book not found',
        statusCode: 404,
      },
    },
  })
  @ApiOkResponse({
    description: 'All books by owner',
    type: [ReadableBookDto],
  })
  @ApiOperation({ description: 'Find all books by owner' })
  @Get()
  async findAll(@Request() req: ValidateUserRequest) {
    return await this.booksService.findAllByOwner(req.user);
  }

  @BadParamsRequest({
    badResp: 'status must be a valid enum value',
    notFoundResp: 'Book not found',
  })
  @ApiOkResponse({
    description: 'Book with updated status',
    type: ReadableBookDto,
  })
  @ApiOperation({ description: 'Update book status' })
  @Patch('status/:id')
  async updateStatus(
    @Param('id', ValidateMongoId) id: string,
    @Body() updateBookStatusDto: UpdateBookStatusDto,
    @Request() req: ValidateUserRequest
  ) {
    return await this.booksService.updateStatus(
      id,
      req.user,
      updateBookStatusDto
    );
  }

  @BadParamsRequest({
    badResp: 'review should not be empty',
    notFoundResp: 'Book not found',
  })
  @ApiOkResponse({
    description: 'Book with updated review and rating',
    type: ReadableBookDto,
  })
  @ApiOperation({ description: 'Update book review and rating' })
  @Patch('review/:id')
  async updateReview(
    @Param('id', ValidateMongoId) id: string,
    @Body() updateBookReviewDto: UpdateBookReviewDto,
    @Request() req: ValidateUserRequest
  ) {
    return await this.booksService.updateReview(
      id,
      req.user,
      updateBookReviewDto
    );
  }

  @BadParamsRequest({
    badResp: `Invalid parameter 'id'`,
    notFoundResp: 'Book not found',
  })
  @ApiOkResponse({
    description: 'Deleted book',
    type: ReadableBookDto,
  })
  @ApiOperation({ description: 'Remove book by id' })
  @Delete(':id')
  async remove(
    @Param('id', ValidateMongoId) id: string,
    @Request() req: ValidateUserRequest
  ) {
    return await this.booksService.removeOne(id, req.user);
  }
}
