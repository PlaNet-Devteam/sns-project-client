import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { NextPageContext } from 'next';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import FeedItem from '@/components/feed/FeedItem';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import { userState } from '@/store/userAtom';
import MetaTag from '@/components/metatag/MetaTag';
import { FeedType } from '@/core';

interface FeedDetailProps {
  initialFeed: FeedType;
}

const FeedDetail = ({ initialFeed }: FeedDetailProps) => {
  const router = useRouter();
  const { payload } = useAuth();
  const myInfo = useRecoilValue(userState);
  const feedId = router.query.id as string;
  const { data: feed, refetch } = useQuery(['feed-detail', feedId], () => {
    if (feedId) {
      if (myInfo || payload) {
        return FeedService.getFeedByUser(parseInt(feedId));
      } else {
        return FeedService.getFeed(parseInt(feedId));
      }
    }
  });

  useEffect(() => {
    if (myInfo) {
      refetch();
    }
  }, [myInfo, refetch]);

  return (
    <>
      {initialFeed && (
        <MetaTag
          title={`[PlaNet SNS] ${initialFeed.user.username}님의 피드`}
          url={`${process.env.NEXT_PUBLIC_SITE_URL}feed/${initialFeed.id}`}
          description={initialFeed?.description}
          image={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${initialFeed.feedImages[0].image}`}
        />
      )}
      <TopHeader>
        <TopHeader.Left>
          <Link href="/feed">뒤로</Link>
        </TopHeader.Left>
        <TopHeader.Title>게시물</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        {payload || myInfo ? (
          <> {feed && <FeedItem item={feed} />} </>
        ) : (
          <FeedItem item={initialFeed} />
        )}
      </article>
    </>
  );
};

export default FeedDetail;

export const getServerSideProps = async function ({ query }: NextPageContext) {
  const feedId = query.id as string;

  const initialFeed = await FeedService.getFeed(parseInt(feedId));

  return {
    props: {
      initialFeed,
    },
  };
};
