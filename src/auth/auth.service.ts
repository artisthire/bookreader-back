import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Profile } from 'passport-google-oauth20';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { PublicUserFieldsDto } from 'src/user/dto/public-user-fields.dto';
import { SessionService } from 'src/session/session.service';
import { IReadableSession } from 'src/session/interfaces/readable-session.interface';
import { IReadableToken } from 'src/token/interfaces/readable-token.interface';
import { TokenUserFieldsDto } from 'src/user/dto/token-user-fields.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private sessionService: SessionService
  ) {}
  async login(
    user: IReadableUser
  ): Promise<{ user: PublicUserFieldsDto } & IReadableToken> {
    const { access, refresh } = await this.tokenService.create(user);
    const userData = new PublicUserFieldsDto(user);
    return { user: { ...userData }, access, refresh };
  }

  async logout(sid: string) {
    await this.sessionService.remove(sid);
  }

  async register(
    createUserDto: CreateUserDto
  ): Promise<{ user: PublicUserFieldsDto } & IReadableToken> {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltRounds
    );

    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    if (!user) {
      throw new ConflictException('Email in use');
    }

    return await this.login(user);
  }

  async loginGoogle(googleUser: Profile): Promise<IReadableToken> {
    const { email, name } = googleUser._json;

    if (!email || !name) {
      throw new UnauthorizedException(
        'Not provided email or user name from google service'
      );
    }

    const user = await this.userService.findByEmail(email);

    if (user) {
      const { access, refresh } = await this.login(user);
      return { access, refresh };
    }

    const newUser = { email, name, password: uuidv4() };

    const { access, refresh } = await this.register(newUser);
    return { access, refresh };
  }

  async refreshAccessToken(
    userData: IReadableUser & IReadableSession
  ): Promise<Pick<IReadableToken, 'access'>> {
    return await this.tokenService.updateAccessToken(userData);
  }

  async validateUser(userData: LoginUserDto): Promise<IReadableUser | null> {
    const { email, password } = userData;
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async validateTokenPayload(
    payload: TokenUserFieldsDto & IReadableSession
  ): Promise<IReadableUser & IReadableSession> {
    const user = await this.userService.find(payload._id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isActiveSession = Boolean(
      await this.sessionService.findBySid(payload.sid)
    );

    if (!isActiveSession) {
      throw new UnauthorizedException('Active session not found');
    }

    return { ...user, sid: payload.sid };
  }
}
