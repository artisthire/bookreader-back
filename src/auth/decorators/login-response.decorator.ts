import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ReadableTokenDto } from 'src/token/dto/readable-token.dto';
import { PublicUserFieldsDto } from 'src/user/dto/public-user-fields.dto';
import { UnauthorizedResponse } from './unauthorized-response.decorator';

export function LoginResponse(status: number) {
  return applyDecorators(
    ApiExtraModels(ReadableTokenDto),
    ApiResponse({
      status,
      schema: {
        allOf: [
          {
            type: 'object',
            properties: {
              user: {
                $ref: getSchemaPath(PublicUserFieldsDto),
              },
            },
          },
          {
            $ref: getSchemaPath(ReadableTokenDto),
          },
        ],
      },
    }),
    UnauthorizedResponse('Invalid login data')
  );
}
