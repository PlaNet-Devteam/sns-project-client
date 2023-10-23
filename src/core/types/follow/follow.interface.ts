import { UserType } from '../user';

export interface FollowType {
  id: number;
  userId: number;
  followingId: number;
  following: UserType;
  follower: UserType;
}
