import {
  Controller,
  Request,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Body,
} from '@nestjs/common';
import { IReadableSession } from 'src/session/interfaces/readable-session.interface';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  private refreshTokenName = 'refresh_token';

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  @Public()
  async login(@Request() req: { user: IReadableUser }) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Get('logout')
  @HttpCode(204)
  async logout(@Request() req: { user: IReadableUser & IReadableSession }) {
    await this.authService.logout(req.user.sid);
    return { message: 'Logout success' };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @Public()
  async refresh(@Request() req: { user: IReadableUser & IReadableSession }) {
    return await this.authService.refreshAccessToken(req.user);
  }
}
