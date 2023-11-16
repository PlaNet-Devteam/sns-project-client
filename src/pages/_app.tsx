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
import BaseLayout from '@/components/layouts/BaseLayout';
import NoneLayout from '@/components/layouts/NoneLayout';
import '@/styles/globals.scss';
import useAuth from '@/hooks/useAuth';

const queryClient = new QueryClient();
const routes = ['/', '/login', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname, replace } = useRouter();
  const { payload } = useAuth();

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
      if (payload) {
        replace('/feed');
      }
    }
  }, [pathname, payload, replace]);

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
