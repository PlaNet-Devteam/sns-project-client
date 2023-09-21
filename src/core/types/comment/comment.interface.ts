import { UserType } from '../user';

export interface CommentType {
  id: number;
  userid: number;
  user: UserType;
  feedId: number;
  comment: string | undefined;
  replyCount: number;
  createdAt?: string;
  updatedAt?: string;
}
