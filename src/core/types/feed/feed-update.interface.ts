import { FeedImageType } from './feed-image.interface';

export interface FeedUpdateType {
  description: string;
  feedImages?: FeedImageType[];
  tagNames?: string[];
}
