import { FEED_STATUS } from '@/core/enum/feed';
import { FeedImageType } from './feed-image.interface';

export interface FeedCreateType {
  userId: number;
  description?: string;
  feedImages?: FeedImageType[];
  status?: FEED_STATUS.ACTIVE;
}
