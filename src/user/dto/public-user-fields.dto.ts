import { IReadableUser } from '../interfaces/readable-user.interface';

export class PublicUserFieldsDto {
  readonly _id: string;
  readonly name: string;
  readonly email: string;

  constructor(model: IReadableUser) {
    this._id = model._id;
    this.name = model.name;
    this.email = model.email;
  }
}
