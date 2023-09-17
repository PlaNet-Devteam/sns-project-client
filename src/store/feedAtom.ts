import { atom } from 'recoil';
import { FeedImageType, FeedType } from '@/core/types/feed';
import { FeedModifyType } from '@/core/types/feed/feed-modify.interface';

// const feedImageState = atom<FeedImageType[]>({
//   key: 'feedImageState',
//   default: [],
// });

const feedImageState = atom<number>({
  key: 'feedImageState',
  default: 0,
});

const feedState = atom<FeedType | null>({
  key: 'feedState',
  default: null,
});

export { feedImageState, feedState };
