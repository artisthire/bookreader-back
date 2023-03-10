import {
  Controller,
  Request,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHideProperty,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Profile } from 'passport-google-oauth20';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { AuthService } from './auth.service';
import { LoginResponse } from './decorators/login-response.decorator';
import { Public } from './decorators/public.decorator';
import { UnauthorizedResponse } from './decorators/unauthorized-response.decorator';
import { GoogleAuthGuard } from './guards/google-auth.guard';
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
  @LoginResponse(201)
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

  @ApiOperation({
    description: `Google authentication. WARNING: Works only for sign-in, after registered on front-end (if you're writing your back-end for a SPECIFIC front-end, then you can configure it right to work both for sign-up & sign-in)`,
  })
  @UseGuards(GoogleAuthGuard)
  @ApiOkResponse({
    description: `Successful operation (redirect to front-end with accessToken, refreshToken in query). Then use GET /user`,
    schema: {
      type: 'string',
      example:
        'https://example.com/google-redirect/?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9D&refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV',
    },
  })
  @UnauthorizedResponse(
    'Not provided or invalid credentials for google service'
  )
  @Get('google')
  @Public()
  async googleAuth() {
    return null;
  }

  // @ApiOperation({
  //   description:
  //     'Singin user afrer google authoriazation and return access and refresh token in URL query parameters',
  // })
  // @ApiProduces('text/plain')
  // @ApiOkResponse({
  //   description: `Return to fron page '/google-redirect' tokens in query parameters. Access token in 'accessToken' parameter, refresh token in 'refreshToken' parameter`,
  //   schema: {
  //     type: 'string',
  //     example:
  //       'https://example.com/google-redirect/?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9D&refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV',
  //   },
  // })
  // @UnauthorizedResponse('Not provided email or user name from google service')
  @ApiHideProperty()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  @Public()
  async googleAuthRedirect(
    @Request() req: { user: Profile },
    @Res() resp: Response
  ) {
    const { access, refresh } = await this.authService.loginGoogle(req.user);
    resp.redirect(
      `${process.env.FRONT_URL}/google-redirect?accessToken=${access}&refreshToken=${refresh}`
    );
  }
}
