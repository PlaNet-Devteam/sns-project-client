import { GENDER } from '@/core/enum';

export interface UserUpdateType {
  nickname?: string;
  bio?: string;
  gender?: GENDER;
  profileImage?: string;
}
