import { atom } from 'recoil';
import { CommentType } from '@/core/types/comment';

// 코멘트 수정 상태
const commentModifyState = atom<boolean>({
  key: 'commentModifyState',
  default: false,
});

// 선택한 코멘트
const commentState = atom<CommentType | null>({
  key: 'commentState',
  default: null,
});

const commentIdState = atom<number>({
  key: 'commentIdState',
  default: 0,
});

export { commentState, commentIdState, commentModifyState };
