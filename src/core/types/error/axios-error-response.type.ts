import { AxiosError, AxiosResponse } from 'axios';

export interface AxiosErrorResponseType extends AxiosError {
  response: AxiosResponse;
  request?: any;
  config: any;
  isAxiosError: boolean;
}
