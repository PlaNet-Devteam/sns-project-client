import { useRouter } from 'next/router';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import BaseLayout from '@/components/Layouts/BaseLayout';
import NoneLayout from '@/components/Layouts/NoneLayout';
import type { AppProps } from 'next/app';
import '@/styles/globals.scss';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

const queryClient = new QueryClient();
const routes = ['/', '/login', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

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

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>{getLayout()}</RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
