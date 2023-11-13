import { FEED_STATUS } from '@/core/enum';
import { BaseListType } from '../common';

export interface FeedListType extends BaseListType {
  tagName?: string;
  status?: FEED_STATUS;
}
