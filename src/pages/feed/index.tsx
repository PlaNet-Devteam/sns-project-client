import React, { useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ImSpinner6 } from 'react-icons/im';
import { FeedType } from '@/core/types/feed';
import FeedItem from '@/components/feed/FeedItem';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import LogoTitleSVG from '@/assets/intro/logo_title.svg';
import FeedService from '@/services/feed';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Feed = () => {
  const [scrollY] = useLocalStorage('scroll_location', 0);

  const { data: feeds } = useQuery(['feeds'], () =>
    FeedService.getFeeds({
      page: 1,
      limit: 10,
    }),
  );

  const {
    data: AdditionalFeedData,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll('newFeeds');

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
          feeds.items.map((feed: FeedType) => (
            <FeedItem key={feed.id} item={feed} />
          ))}
        {AdditionalFeedData &&
          AdditionalFeedData.pages.slice(1).map((page, index) => (
            <div key={index}>
              {page.items.map((feed: FeedType) => (
                <FeedItem key={feed.id} item={feed} />
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

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['feeds'], async () => {
    const { data } = await FeedService.getFeeds({
      page: 1,
      limit: 10,
    });

    return data;
  });
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Feed;
