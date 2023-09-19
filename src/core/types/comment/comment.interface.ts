import { UserType } from '../user';

export interface CommentType {
  id: number;
  userid: number;
  user: UserType;
  feedId: number;
  comment: string;
  replyCount: number;
  created_at?: string;
  updated_at?: string;
}
