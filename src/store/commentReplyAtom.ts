import { atom } from 'recoil';
import { CommentReplyType } from '@/core/types/comment-reply';

const commentReplyModalState = atom<boolean>({
  key: 'commentReplyModalState',
  default: false,
});

const commentReplyState = atom<CommentReplyType | null>({
  key: 'commentReplyState',
  default: null,
});

const replyToUsernameState = atom<string>({
  key: 'replyToUsernameState',
  default: '',
});

const replyToUserCommentState = atom<boolean>({
  key: 'replyToUserCommentState',
  default: false,
});

export {
  commentReplyState,
  commentReplyModalState,
  replyToUsernameState,
  replyToUserCommentState,
};
