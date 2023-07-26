import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import FeedItem from '@/components/feed/FeedItem';
import FeedService from '@/services/feed';
import { FeedType } from '@/core/types/feed';
import TopHeader from '@/components/nav/topHeader/TopHeader';

const MyFeed = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: feeds } = useQuery(['myFeeds'], () =>
    FeedService.findAllByUser(username),
  );

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
        {feeds &&
          feeds.map((feed: FeedType) => (
            <FeedItem key={feed.id} item={feed} test={true} />
          ))}
      </div>
    </>
  );
};

export default MyFeed;
