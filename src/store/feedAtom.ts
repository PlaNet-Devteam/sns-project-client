import { atom } from 'recoil';
import { FeedImageType } from '@/core/types/feed';

// const feedImageState = atom<FeedImageType[]>({
//   key: 'feedImageState',
//   default: [],
// });

const feedImageState = atom<number>({
  key: 'feedImageState',
  default: 0,
});

export { feedImageState };
