import axios from 'axios';
import JwtStorageService, {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '@/core/utils/jwt-storage';
import AuthService from '@/services/auth';
import { RESPONSE_STATUS } from './enum';

const accessToken = JwtStorageService.getToken(ACCESS_TOKEN);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (request) => {
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.code === 'ERR_NETWORK') {
      alert('네트워크 오류');
      location.replace('/');
    }
    if (error.response) {
      const { data } = error.response;
      // 토큰이 없을 때
      if (data.error === RESPONSE_STATUS.NO_ACCESS_TOKEN) {
        location.replace('/login');
        return Promise.reject(error);
      }
      // 엑세스 토큰 만료
      if (data.error === RESPONSE_STATUS.ACCESS_TOKEN_EXP) {
        const { data } = await AuthService.refreshToken();
        if (data) {
          JwtStorageService.setToken(ACCESS_TOKEN, data.accessToken);
          JwtStorageService.setToken(REFRESH_TOKEN, data.refreshToken);
        }
        // ! : useQuery로 요청시 반복적으로 요청되는 이슈 발생
        location.reload();
        return Promise.reject(error);
      }
      // 리프레시 토큰이 없거나 만료되었을 때
      if (
        data.error === RESPONSE_STATUS.NO_REFRESH_TOKEN ||
        data.error === RESPONSE_STATUS.REFRESH_TOKEN_EXP
      ) {
        location.replace('/login');
        JwtStorageService.removeToken(ACCESS_TOKEN);
        JwtStorageService.removeToken(REFRESH_TOKEN);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error); // 오류를 반환하여 다음 단계로 전달
  },
);
