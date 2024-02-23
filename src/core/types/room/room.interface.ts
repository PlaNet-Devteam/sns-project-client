import { MessageType } from '../message';
import { UserType } from '../user';

export interface RoomType {
  id: number;
  roomUniqueId: string;
  users: UserType[];
  messages: MessageType[];
  createdAt: string;
}
