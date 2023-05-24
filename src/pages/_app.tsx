import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JwtStorageService, { ACCESS_TOKEN } from '@/core/utils/jwt-storage';
import BaseLayout from '@/components/Layouts/BaseLayout';
import NoneLayout from '@/components/Layouts/NoneLayout';
import '@/styles/globals.scss';

const queryClient = new QueryClient();
const routes = ['/', '/login', '/signup'];
const accessToken = JwtStorageService.getToken(ACCESS_TOKEN);

export default function App({ Component, pageProps }: AppProps) {
  const { pathname, replace } = useRouter();

  const getLayout = () => {
    if (routes.includes(pathname)) {
      return (
        <NoneLayout>
          <Component {...pageProps} />
        </NoneLayout>
      );
    } else {
      return (
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      );
    }
  };

  useEffect(() => {
    if (routes.includes(pathname)) {
      if (accessToken) {
        replace('/profile');
      }
    }
  }, [pathname, replace]);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        {getLayout()}
      </QueryClientProvider>
    </CookiesProvider>
  );
}
