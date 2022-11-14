import { IReadableUser } from '../interfaces/readable-user.interface';

export class TokenUserFieldsDto {
  readonly _id: string;

  constructor(model: IReadableUser) {
    this._id = model._id;
  }
}
