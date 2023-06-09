import React from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FeedImageType } from '@/core/types/feed';
import FeedItem from '@/components/feed/FeedItem';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import LogoTitleSVG from '@/assets/intro/logo_title.svg';
import { getFeeds } from '../../utils/api';

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
  const { data } = useQuery(['feeds'], getFeeds);
  const feeds: FeedType[] = data?.data.data.items;
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
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(['feeds'], getFeeds);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Feed;
