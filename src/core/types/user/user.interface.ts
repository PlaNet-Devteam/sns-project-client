import { GENDER, USER_STATUS } from '@/core/enum';

export interface UserType {
  id: number;
  username: string;
  nickname: string;
  email: string;
  status: USER_STATUS;
  followerCount?: number;
  followingCount?: number;
  feedCount?: number;
  profileImage?: string;
  bio?: string;
  gender?: GENDER;
  followingIds: number[];
  followerIds: number[];
}

export interface UserPayloadType {
  _id: number;
  nickname: string;
  username: string;
  email: string;
  status: USER_STATUS;
}
