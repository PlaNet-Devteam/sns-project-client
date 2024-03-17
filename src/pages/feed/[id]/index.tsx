import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import FeedItem from '@/components/feed/FeedItem';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import { userState } from '@/store/userAtom';
import MetaTag from '@/components/metatag/MetaTag';

const FeedDetail = () => {
  const router = useRouter();
  const { payload } = useAuth();
  const user = useRecoilValue(userState);
  const feedId = router.query.id as string;
  const { data: feed } = useQuery(['feed-detail', feedId], () => {
    if (feedId) {
      if (user || payload) {
        return FeedService.getFeedByUser(parseInt(feedId));
      } else {
        return FeedService.getFeed(parseInt(feedId));
      }
    }
  });

  return (
    <>
      {feed && (
        <MetaTag
          title={`${feed.user.username}님의 피드`}
          url={`${process.env.NEXT_PUBLIC_SITE_URL}feed/${feed.id}`}
          description={feed?.description}
          image={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${feed.feedImages[0].image}`}
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
        {feed && <FeedItem item={feed} />}
      </article>
    </>
  );
};

export default FeedDetail;
