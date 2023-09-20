import { ORDER_BY } from '@/core/enum';

export interface BaseListType {
  page?: number;
  limit?: number;
  orderBy?: ORDER_BY;
}
