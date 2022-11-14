import {
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(100)
  @Matches(/[a-zа-яё 0-9]/i)
  readonly name: string;

  @MinLength(10)
  @MaxLength(63)
  @IsEmail()
  readonly email: string;

  @MinLength(5)
  @MaxLength(30)
  @NotContains(' ')
  readonly password: string;
}
