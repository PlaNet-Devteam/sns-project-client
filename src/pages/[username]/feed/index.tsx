import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import FeedItem from '@/components/feed/FeedItem';
import FeedService from '@/services/feed';
import { FeedType } from '@/core/types/feed';

const MyFeed = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: feeds } = useQuery(['myFeeds'], () =>
    FeedService.findAllByUser(username),
  );

  return (
    <div>
      {feeds &&
        feeds.map((feed: FeedType) => <FeedItem key={feed.id} item={feed} />)}
    </div>
  );
};

export default MyFeed;
