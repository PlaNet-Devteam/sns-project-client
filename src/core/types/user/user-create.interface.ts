import { USER_STATUS, GENDER } from '@/core/enum';

export interface UserCreateType {
  email: string;
  username: string;
  nickname?: string;
  password: string;
  passwordConfirm: string;
  status: USER_STATUS;
  bio?: string;
  gender?: GENDER;
}
