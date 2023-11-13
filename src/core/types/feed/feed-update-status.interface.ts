import { FEED_STATUS, YN } from '@/core/enum';

export interface FeedUpdateStatusType {
  showLikeCountYn?: YN;
  displayYn?: YN;
  status?: FEED_STATUS;
}
