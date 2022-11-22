import { IReadableSession } from 'src/session/interfaces/readable-session.interface';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';

export type ValidateUserRequest = Request & {
  user: IReadableUser & IReadableSession;
};
