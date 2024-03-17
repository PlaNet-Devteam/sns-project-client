import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import FeedItem from '@/components/feed/FeedItem';
import { FeedType } from '@/core';
import FeedService from '@/services/feed';

const FeedDetail = () => {
  const router = useRouter();
  const feedId = router.query.id as string;
  const { data: feed } = useQuery<FeedType>(['feed', feedId], () =>
    FeedService.getFeed(parseInt(feedId)),
  );

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <Link href="/feed">뒤로</Link>
        </TopHeader.Left>
        <TopHeader.Title>게시물</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        {feed && <FeedItem item={feed} />}
      </article>
    </>
  );
};

export default FeedDetail;
