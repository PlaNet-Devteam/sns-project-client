import { FeedImageCreateType } from './feed-image.interface';

export interface FeedCreateType {
  description: string;
  feedImages: FeedImageCreateType[];
  tagNames?: string[];
}
