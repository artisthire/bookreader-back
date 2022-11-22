import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IReadableUser } from '../interfaces/readable-user.interface';
import { CreateUserDto } from './create-user.dto';

export class PublicUserFieldsDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @ApiProperty({ description: 'User MongoDB id' })
  readonly _id: string;

  constructor(model: IReadableUser) {
    super();
    this._id = model._id;
    this.name = model.name;
    this.email = model.email;
  }
}
