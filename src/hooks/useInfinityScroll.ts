import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import FeedService from '@/services/feed';
import { IntersectionObserverCallback } from '@/core/types/feed';
import { useObserver } from './useObserver';

export const useInfinityScroll = (
  FeedDataClassification: string,
  username?: string | string[] | undefined,
) => {
  const bottom = useRef<HTMLDivElement>(null);

  const FetchFeedData = (
    FeedDataClassification: string,
    pageParam: number,
    username?: string | string[] | undefined,
  ) => {
    if (FeedDataClassification === 'newFeeds') {
      return FeedService.getFeeds({
        page: pageParam,
        limit: 10,
      });
    }
    if (FeedDataClassification === 'myFeeds') {
      return FeedService.findAllByUser(username, {
        page: pageParam,
        limit: 10,
      });
    }
    if (FeedDataClassification === 'bookmark') {
      if (username) {
        return FeedService.findAllByUser(username, {
          page: pageParam,
          limit: 10,
        });
      }
    }
  };

  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    [FeedDataClassification],
    ({ pageParam = 1 }) =>
      FetchFeedData(FeedDataClassification, pageParam, username),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.pageInfo.isLast) return lastPage.pageInfo.page + 1;
        return undefined;
      },
    },
  );

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && status === 'success') {
      fetchNextPage();
    }
  };

  useObserver({
    ref: true,
    target: bottom,
    onIntersect,
  });
  return { data, isFetchingNextPage, status, bottom };
};
