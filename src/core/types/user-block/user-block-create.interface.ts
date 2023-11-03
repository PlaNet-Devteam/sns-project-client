import { USER_BLOCK } from '@/core/enum';

export interface UserBlockCreateType {
  userId: number;
  blockedUserId: number;
  actionType?: USER_BLOCK;
}
