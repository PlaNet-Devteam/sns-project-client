import axios, { InternalAxiosRequestConfig } from 'axios';
import JwtStorageService from '@/core/utils/jwt-storage';

export const api = axios.create({
  baseURL: 'http://localhost:4300',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (typeof window !== 'undefined') {
      const accessToken = JwtStorageService.getToken();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
  },
);
