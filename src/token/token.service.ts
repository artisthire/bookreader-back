import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { IReadableToken } from './interfaces/readable-token.interface';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { TokenUserFieldsDto } from 'src/user/dto/token-user-fields.dto';
import { SessionService } from 'src/session/session.service';
import { IReadableSession } from 'src/session/interfaces/readable-session.interface';

@Injectable()
export class TokenService {
  private jwtAccessSecret: string | undefined;
  private jwtAccessExpiration: string | undefined;
  private jwtRefreshSecret: string | undefined;
  private jwtRefreshExpiration: string | undefined;

  constructor(
    private sessionService: SessionService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {
    this.jwtAccessSecret = this.configService.get<string>('JWT_SECRET_ACCESS');
    this.jwtAccessExpiration = this.configService.get<string>(
      'JWT_EXPIRATION_ACCESS'
    );
    this.jwtRefreshSecret =
      this.configService.get<string>('JWT_SECRET_REFRESH');
    this.jwtRefreshExpiration = this.configService.get<string>(
      'JWT_EXPIRATION_REFRESH'
    );
  }

  async create(user: IReadableUser): Promise<IReadableToken> {
    const sid = await this.sessionService.create();

    const access = this.createToken(
      { user, sid },
      {
        secret: this.jwtAccessSecret,
        expiresIn: this.jwtAccessExpiration,
      }
    );

    const refresh = this.createToken(
      { user, sid },
      {
        secret: this.jwtRefreshSecret,
        expiresIn: this.jwtRefreshExpiration,
      }
    );

    return { access, refresh };
  }

  async updateAccessToken(
    userData: IReadableUser & IReadableSession
  ): Promise<Pick<IReadableToken, 'access'>> {
    const { sid, ...user } = userData;

    const access = this.createToken(
      { user, sid },
      {
        secret: this.jwtAccessSecret,
        expiresIn: this.jwtAccessExpiration,
      }
    );

    return { access };
  }

  createToken(
    payload: {
      user: IReadableUser;
      sid: string;
    },
    tokenOptions: JwtSignOptions
  ): string {
    const { user, sid } = payload;
    const userTokenFields = new TokenUserFieldsDto(user);
    const token = this.jwtService.sign(
      { ...userTokenFields, sid },
      {
        ...tokenOptions,
      }
    );

    return token;
  }
}
