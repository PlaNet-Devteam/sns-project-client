import React, { useRef } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { ImSpinner6 } from 'react-icons/im';
import FeedItem from '@/components/feed/FeedItem';
import FeedService from '@/services/feed';
import { FeedType } from '@/core/types/feed';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import { useObserver } from '@/hooks/useObserver';
import { IntersectionObserverCallback } from '@/core/types/feed';
import EmptyData from '@/components/common/EmptyData';

const MyFeed = () => {
  const bottom = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { username } = router.query;

  const {
    data: myFeeds,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['myFeeds'],
    ({ pageParam = 1 }) =>
      FeedService.findAllByUser(username, {
        page: pageParam,
        limit: 10,
      }),
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

  if (myFeeds && myFeeds.pages.length === 0) {
    return <EmptyData />;
  }

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>내 게시물</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <div className="feed_container">
        {myFeeds &&
          myFeeds.pages.map((page, index) => (
            <div key={index}>
              {page.items.map((feed: FeedType) => (
                <FeedItem key={feed.id} item={feed} test={true} />
              ))}
            </div>
          ))}
      </div>
      <div ref={bottom} />

      <div className="spinner_container">
        {status === 'success' && isFetchingNextPage ? (
          <ImSpinner6 className="spinner" />
        ) : null}
      </div>
    </>
  );
};

export default MyFeed;
