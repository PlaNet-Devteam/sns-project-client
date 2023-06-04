export interface CommentsType {
  comment: Array<CommentType>;
}

export interface CommentType {
  id: number;
  userid: number;
  feedId: number;
  comment: string;
  likeCount: number;
  replyCount: number;
  created_at: string;
  updated_at: string;
}

export interface CommentPropsType {
  comment: CommentType;
}
