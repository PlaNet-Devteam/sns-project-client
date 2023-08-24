import { atom } from 'recoil';
import { FeedImageType } from '@/core/types/feed';

const feedImageState = atom<FeedImageType[]>({
  key: 'feedImageState',
  default: [],
});

export { feedImageState };
