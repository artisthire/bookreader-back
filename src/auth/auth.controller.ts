import {
  Controller,
  Request,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Body,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { AuthService } from './auth.service';
import { LoginResponse } from './decorators/login-response.decorator';
import { Public } from './decorators/public.decorator';
import { UnauthorizedResponse } from './decorators/unauthorized-response.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidateUserRequest } from './interfaces/validate-user-request.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDto })
  @LoginResponse(200)
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  @Public()
  async login(@Request() req: { user: IReadableUser }) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ description: 'Register user' })
  @ApiBody({ type: CreateUserDto })
  @LoginResponse(201)
  @ApiBadRequestResponse({
    description: 'Parameter missing',
    schema: {
      type: 'object',
      required: ['message', 'statusCode'],
      properties: {
        message: {
          type: 'string[]',
        },
        statusCode: {
          type: 'integer',
        },
      },
      example: {
        message: ['password must be longer than or equal to 5 characters'],
        statusCode: 400,
      },
    },
  })
  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @ApiOperation({ description: 'Logout' })
  @ApiBearerAuth()
  @Get('logout')
  @HttpCode(204)
  async logout(@Request() req: ValidateUserRequest) {
    await this.authService.logout(req.user.sid);
    return { message: 'Logout success' };
  }

  @ApiOperation({
    summary: 'WARNING. Expected authorization header with REFRESH token',
    description: 'Return access token',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        access: {
          type: 'string',
        },
      },
    },
  })
  @UnauthorizedResponse('Invalid login data')
  @ApiBearerAuth('refresh')
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @Public()
  async refresh(@Request() req: ValidateUserRequest) {
    return await this.authService.refreshAccessToken(req.user);
  }
}
