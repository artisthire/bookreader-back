import { Controller, Get, Request } from '@nestjs/common';

import { PublicUserFieldsDto } from './dto/public-user-fields.dto';
import { IReadableUser } from './interfaces/readable-user.interface';

@Controller('user')
export class UserController {
  @Get('profile')
  getProfile(@Request() req: { user: IReadableUser }) {
    return { ...new PublicUserFieldsDto(req.user) };
  }
}
