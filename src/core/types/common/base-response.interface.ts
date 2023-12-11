import { RESPONSE_STATUS } from '@/core/enum';

export interface BaseResponse<T> {
  status: RESPONSE_STATUS;
  data: T | T[];
  error?: string | string[];
  namespace?: string | string[];
}
