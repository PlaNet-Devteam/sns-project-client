import { USER_STATUS } from '@/core/enum';

export interface UserType {
  username: string;
  nickname: string;
  email: string;
  status: USER_STATUS;
  followerCount?: number;
  followingCount?: number;
  feedCount?: number;
  profileImage?: string;
  bio?: string;
  id: number;
}
