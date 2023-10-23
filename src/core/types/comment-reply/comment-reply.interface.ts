import { UserType } from '../user';

export interface CommentReplyType {
  id: number;
  commentId: number;
  userid: number;
  user: UserType;
  comment: string | undefined;
  createdAt?: string;
  updatedAt?: string;
}
