import { FeedImageType } from './feed-image.interface';

export interface FeedCreateType {
  description?: string;
  feedImages?: FeedImageType[];
  tagNames?: string[];
}
