import React, { useEffect, useRef } from 'react';
import {
  dehydrate,
  QueryClient,
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import Link from 'next/link';
import { ImSpinner6 } from 'react-icons/im';
import useLocalStorage from 'use-local-storage';
import { FeedImageType } from '@/core/types/feed';
import FeedItem from '@/components/feed/FeedItem';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import LogoTitleSVG from '@/assets/intro/logo_title.svg';
import { useObserver } from '@/hooks/useObserver';
import { IntersectionObserverCallback } from '@/core/types/feed';
import { getFeeds, getServerFeeds } from '../../utils/api';

interface FeedType {
  id: string;
  description: string;
  likeCount: number;
  commentCount: number;
  feedImage: FeedImageType[];
  comment: string[];
  tag: string[];
}

const Feed = () => {
  const { data } = useQuery(['feeds'], getServerFeeds);
  const feeds: FeedType[] = data?.data.data.items;
  const bottom = useRef<HTMLDivElement>(null);
  const [scrollY] = useLocalStorage('scroll_location', 0);

  const {
    data: newdata,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['newfeeds'], getFeeds, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.isLast) return lastPage.page + 1;
      return undefined;
    },
  });

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

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <Link href="/feed">
            <h1 className="top-header__logo">
              <LogoTitleSVG />
            </h1>
          </Link>
        </TopHeader.Left>
        <TopHeader.Right>메뉴</TopHeader.Right>
      </TopHeader>
      <title>feed</title>
      <div className="feed_container">
        {feeds &&
          feeds.map((feed: FeedType) => (
            <FeedItem
              key={feed.id}
              id={feed.id}
              description={feed.description}
              likeCount={feed.likeCount}
              commentCount={feed.commentCount}
              feedImage={feed.feedImage}
            />
          ))}
      </div>
      <div>
        {newdata &&
          newdata.pages.slice(1).map((group, index) => (
            <div key={index}>
              {group.data.items.map((feed: FeedType) => (
                <FeedItem
                  key={feed.id}
                  id={feed.id}
                  description={feed.description}
                  likeCount={feed.likeCount}
                  commentCount={feed.commentCount}
                  feedImage={feed.feedImage}
                />
              ))}
            </div>
          ))}
      </div>
      <div ref={bottom} />
      <div className="spinner_container">
        {status === 'success' && !isFetchingNextPage ? (
          <ImSpinner6 className="spinner" />
        ) : null}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(['feeds'], getServerFeeds);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Feed;
