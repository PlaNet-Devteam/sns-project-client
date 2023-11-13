import { FEED_STATUS, YN } from '@/core/enum';
import { UserType } from '../user';
import { FeedImageType } from './feed-image.interface';

export interface FeedType {
  id: number;
  userId?: number;
  user: UserType;
  description?: string;
  likeCount?: number;
  commentCount?: number;
  showLikeCountYn?: YN;
  feedImages: FeedImageType[];
  comments?: string[];
  tags?: string[];
  displayYn?: YN;
  likedYn?: boolean;
  status?: FEED_STATUS;
  bookmarkedYn?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[]): void;
}
