import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { IntersectionObserverCallback } from '@/core/types/feed';
import { AxiosErrorResponseType } from '@/core/types/error/axios-error-response.type';
import { useObserver } from './useObserver';

export const useInfinityScroll = (
  queryKey: string,
  callback: (page: number, limit?: number) => Promise<any>,
  limit = 10,
) => {
  const bottom = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data, fetchNextPage, isFetchingNextPage, status, hasNextPage } =
    useInfiniteQuery(
      [queryKey],
      ({ pageParam = 1 }) => {
        return callback(pageParam, limit);
      },
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage.pageInfo.isLast) return lastPage.pageInfo.page + 1;
          return undefined;
        },
        onError: (error: AxiosErrorResponseType) => {
          if (error?.response?.status === 404) {
            alert(error?.response?.data.message);
            router.push('/login');
          }
        },
      },
    );

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && status === 'success') {
      if (data.pages[data.pages.length - 1].items.length > 0 && hasNextPage) {
        fetchNextPage();
      }
    }
  };

  useObserver({
    ref: true,
    target: bottom,
    onIntersect,
  });
  return { data, isFetchingNextPage, status, bottom, hasNextPage };
};
