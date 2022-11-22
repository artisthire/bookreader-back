import {
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  NotContains,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    minimum: 3,
    maximum: 100,
    example: 'Jhon',
  })
  @MinLength(3)
  @MaxLength(100)
  @Matches(/[a-zа-яё 0-9]/i)
  name: string;

  @ApiProperty({
    description: 'User email',
    minimum: 10,
    maximum: 63,
    format: 'email',
  })
  @MinLength(10)
  @MaxLength(63)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    minimum: 5,
    maximum: 30,
    example: 'Querty123',
  })
  @MinLength(5)
  @MaxLength(30)
  @NotContains(' ')
  password: string;
}
