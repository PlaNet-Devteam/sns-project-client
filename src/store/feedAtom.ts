import { atom } from 'recoil';
import { FeedType } from '@/core/types/feed';

export interface feedModalStateType {
  queryKey: unknown[];
  id: number;
}

const feedImageState = atom<number>({
  key: 'feedImageState',
  default: 0,
});

const feedState = atom<FeedType | null>({
  key: 'feedState',
  default: null,
});

// * 피드 상세 모달 상태
const isFeedModalOpenState = atom<boolean>({
  key: 'isFeedModalOpenState',
  default: false,
});

const feedModalState = atom<feedModalStateType | null>({
  key: 'feedModalState',
  default: null,
});

export { feedImageState, feedState, isFeedModalOpenState, feedModalState };
