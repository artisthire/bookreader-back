import { ApiProperty } from '@nestjs/swagger';
import { IReadableUser } from '../interfaces/readable-user.interface';

export class PublicUserFieldsDto {
  @ApiProperty()
  readonly _id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;

  constructor(model: IReadableUser) {
    this._id = model._id;
    this.name = model.name;
    this.email = model.email;
  }
}
