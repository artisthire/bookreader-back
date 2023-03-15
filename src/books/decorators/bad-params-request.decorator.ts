import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNoContentResponse } from '@nestjs/swagger';

export function BadParamsRequest(exampleMessages: {
  badResp: string;
  notFoundResp: string;
}) {
  return applyDecorators(
    ApiBadRequestResponse({
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
          message: exampleMessages.badResp,
          statusCode: 400,
        },
      },
    }),
    ApiNoContentResponse({
      description: 'Data not found by user or id',
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
          message: exampleMessages.notFoundResp,
          statusCode: 204,
        },
      },
    })
  );
}
