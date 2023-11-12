import { FEED_STATUS, YN } from '@/core/enum';
import { FeedImageType } from './feed-image.interface';

export interface FeedUpdateType {
  description?: string;
  feedImages?: FeedImageType[];
  showLikeCountYn?: YN;
  displayYn?: YN;
  status?: FEED_STATUS;
}
