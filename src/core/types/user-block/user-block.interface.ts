import { USER_BLOCK } from '@/core/enum';
import { UserType } from '../user/user.interface';

export interface UserBlockType {
  id: number;
  userId: number;
  blockedUserId: number;
  actionType: USER_BLOCK;
  blockedUser: UserType;
}
