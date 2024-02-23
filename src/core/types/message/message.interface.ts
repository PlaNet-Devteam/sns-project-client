import { UserType } from '../user';

export interface MessageType {
  id?: number;
  userId: number;
  roomId: number;
  message: string;
  createdAt: Date | string;
  user: UserType;
}
