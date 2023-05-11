import axios, { InternalAxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

// 테스트 용

interface BaseProps {
  children?: ReactNode;
}

let accessToken: string | null;

export const api = axios.create({
  baseURL: 'http://localhost:4300',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

function BaseLayout({ children }: BaseProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      if (!accessToken) {
        router.push('/login');
      }
    }
  }, []);

  return <div className="layout-container">{children}</div>;
}

export default BaseLayout;
