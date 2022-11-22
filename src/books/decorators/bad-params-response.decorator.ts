import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export function BadParamsResponse(exampleMessages: {
  badResp: string;
  notFoundResp: string;
}) {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Parameter missing',
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
    ApiNotFoundResponse({
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
          statusCode: 404,
        },
      },
    })
  );
}
