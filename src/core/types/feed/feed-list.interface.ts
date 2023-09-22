import { BaseListType } from '../common';

export interface FeedListType extends BaseListType {
  userId?: number;
  tag?: string;
}
