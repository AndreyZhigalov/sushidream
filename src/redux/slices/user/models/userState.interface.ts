import { UserInfo } from 'firebase/auth';

export type UserState = UserInfo & {
  loyalty: boolean;
};
