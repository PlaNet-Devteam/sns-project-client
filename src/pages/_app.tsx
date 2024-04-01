import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import io from 'socket.io-client';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { GoogleOAuthProvider } from '@react-oauth/google';
import BaseLayout from '@/components/layouts/BaseLayout';
import NoneLayout from '@/components/layouts/NoneLayout';
import '@/styles/globals.scss';
import useAuth from '@/hooks/useAuth';
import { SocketProvider } from '@/contexts/SocketContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
const routes = ['/', '/login', '/signup', '/signup/complete', '/_error'];

const socket = io(process.env.NEXT_PUBLIC_API_URL, {
  reconnectionDelayMax: 1000,
  reconnection: true,
  transports: ['websocket'],
  withCredentials: true,
});

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
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID as string}
    >
      <SocketProvider socket={socket}>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <RecoilRoot>{getLayout()}</RecoilRoot>
            </Hydrate>
          </QueryClientProvider>
        </CookiesProvider>
      </SocketProvider>
    </GoogleOAuthProvider>
  );
}
