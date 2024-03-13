import { ORDER_BY } from '@/core/enum';

export interface BaseListType {
  page?: number;
  limit?: number;
  orderBy?: ORDER_BY;
  viewerId?: number;
}

export interface InfinitePagesType<T> {
  items: T[];
  totalCount: number;
  pageInfo: {
    page: number;
    limit: number;
    isLast: boolean;
  };
}
