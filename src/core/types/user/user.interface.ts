import { GENDER, USER_STATUS, YN } from '@/core/enum';

export interface UserType {
  id: number;
  username: string;
  nickname: string;
  email: string;
  status: USER_STATUS;
  inactiveAt?: Date;
  delYn?: YN;
  followerCount: number;
  followingCount: number;
  feedCount: number;
  profileImage?: string;
  bio?: string;
  gender?: GENDER;
  followingIds?: number[];
  followerIds?: number[];
  lastLoginAt?: Date;
  createdAt?: Date;
  isBlockedByViewer?: boolean;
}

export interface UserPayloadType {
  _id: number;
  nickname: string;
  username: string;
  email: string;
  status: USER_STATUS;
}
