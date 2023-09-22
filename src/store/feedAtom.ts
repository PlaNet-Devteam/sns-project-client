import { atom } from 'recoil';
import { FeedType } from '@/core/types/feed';

const feedImageState = atom<number>({
  key: 'feedImageState',
  default: 0,
});

const feedState = atom<FeedType | null>({
  key: 'feedState',
  default: null,
});

export { feedImageState, feedState };
