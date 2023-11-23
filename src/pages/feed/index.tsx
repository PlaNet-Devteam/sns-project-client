import React, { useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FeedType } from '@/core/types/feed';
import FeedItem from '@/components/feed/FeedItem';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import LogoTitleSVG from '@/assets/intro/logo_title.svg';
import FeedService from '@/services/feed';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { InfinitePagesType } from '@/core/types/common';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import LoadingSpinnerContainer from '@/components/common/LoadingSpinnerContainer';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Feed = () => {
  const [scrollY] = useLocalStorage('scroll_location', 0);

  const { data: feeds, isLoading } = useQuery<InfinitePagesType<FeedType>>(
    ['feeds'],
    () =>
      FeedService.getFeedsByFollowing({
        page: 1,
      }),
  );

  const {
    data: AdditionalFeedData,
    status,
    hasNextPage,
    bottom,
  } = useInfinityScroll<FeedType>(['newFeeds'], (page, limit) =>
    FeedService.getFeedsByFollowing({ page, limit }),
  );

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, [scrollY]);

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
      <article className="article__container">
        {isLoading && <LoadingSpinner variant="white" />}
        {feeds &&
          feeds.items.map((feed) => <FeedItem key={feed.id} item={feed} />)}
        {AdditionalFeedData &&
          AdditionalFeedData.pages.slice(1).map((page, index) => (
            <div key={index}>
              {page.items.map((feed) => (
                <FeedItem key={feed.id} item={feed} />
              ))}
            </div>
          ))}
        <div ref={bottom} />
        <LoadingSpinnerContainer
          isLoading={status === 'success' && !hasNextPage === undefined}
        />
      </article>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<InfinitePagesType<FeedType>>(
    ['feeds'],
    async () => {
      const { data } = await FeedService.getFeeds({
        page: 1,
      });

      return data;
    },
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Feed;
