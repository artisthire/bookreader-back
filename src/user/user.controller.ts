import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PublicUserFieldsDto } from './dto/public-user-fields.dto';
import { IReadableUser } from './interfaces/readable-user.interface';
import { UnauthorizedResponse } from 'src/auth/decorators/unauthorized-response.decorator';

@ApiTags('user')
@ApiBearerAuth()
@UnauthorizedResponse('Unauthorized request')
@Controller('user')
export class UserController {
  @ApiOkResponse({
    description: 'User profile',
    type: PublicUserFieldsDto,
  })
  @Get('profile')
  getProfile(@Request() req: { user: IReadableUser }) {
    return { ...new PublicUserFieldsDto(req.user) };
  }
}
