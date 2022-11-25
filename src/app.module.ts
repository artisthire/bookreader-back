import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { SessionModule } from './session/session.module';
import { BooksModule } from './books/books.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    UserModule,
    AuthModule,
    TokenModule,
    SessionModule,
    BooksModule,
    TrainingModule,
  ],
})
export class AppModule {}
