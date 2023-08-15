import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import JwtStorageService, { ACCESS_TOKEN } from '@/core/utils/jwt-storage';
import BaseLayout from '@/components/layouts/BaseLayout';
import NoneLayout from '@/components/layouts/NoneLayout';
import '@/styles/globals.scss';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

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
        replace('/feed');
      }
    }
  }, [pathname, replace]);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>{getLayout()}</RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
