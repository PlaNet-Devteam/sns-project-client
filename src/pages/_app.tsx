import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BaseLayout from '@/components/Layouts/BaseLayout';
import '@/styles/globals.scss';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </QueryClientProvider>
  );
}
