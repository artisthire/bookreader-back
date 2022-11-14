import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { TokenUserFieldsDto } from 'src/user/dto/token-user-fields.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { IReadableSession } from 'src/session/interfaces/readable-session.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwtRefresh'
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH,
    });
  }

  async validate(
    payload: TokenUserFieldsDto & IReadableSession
  ): Promise<IReadableUser & IReadableSession> {
    return await this.authService.validateTokenPayload(payload);
  }
}
