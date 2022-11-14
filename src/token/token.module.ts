import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from 'src/session/session.module';
import { TokenService } from './token.service';

@Module({
  imports: [SessionModule, JwtModule, ConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
