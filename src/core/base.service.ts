import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/core/utils/jwt-storage';
import JwtStorageService from '@/core/utils/jwt-storage';
import { RESPONSE_STATUS } from './enum';

export const api = axios.create({
  baseURL: 'http://localhost:4300',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const token = JwtStorageService.getToken(ACCESS_TOKEN);

api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const { status, data } = error.response;
    console.log(' error.response', error.response);
    // 토큰이 없을 때
    if (data.error === RESPONSE_STATUS.NO_ACCESS_TOKEN) {
      location.replace('/login');
    }

    // 엑세스 토큰 만료
    if (data.error === RESPONSE_STATUS.ACCESS_TOKEN_EXP) {
      const { data } = await axios.post(
        'http://localhost:4300/auth/refresh-token',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('dddafdfadf', data);
      // JwtStorageService.removeToken(ACCESS_TOKEN);
      return;
    }

    // 리프레시 토큰이 없거나 만료되었을 때
    if (
      data.error === RESPONSE_STATUS.NO_REFRESH_TOKEN ||
      data.error === RESPONSE_STATUS.REFRESH_TOKEN_EXP
    ) {
      JwtStorageService.removeToken(ACCESS_TOKEN);
      JwtStorageService.removeToken(REFRESH_TOKEN);
      return;
    }
  },
);
