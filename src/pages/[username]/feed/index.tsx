import React from 'react';
import { useRouter } from 'next/router';
import { ImSpinner6 } from 'react-icons/im';
import FeedItem from '@/components/feed/FeedItem';
import { FeedType } from '@/core/types/feed';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import EmptyData from '@/components/common/EmptyData';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

const MyFeed = () => {
  const router = useRouter();
  const { username } = router.query;

  const {
    data: FeedDatas,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll('myFeeds', username);

  if (FeedDatas && FeedDatas.pages.length === 0) {
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
        {FeedDatas &&
          FeedDatas.pages.map((page, index) => (
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

export default MyFeed;
