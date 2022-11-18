import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export function UnauthorizedResponse(description: string) {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description,
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
          message: 'Unauthorized',
          statusCode: 401,
        },
      },
    })
  );
}
