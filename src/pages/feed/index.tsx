import React from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import FeedItem from '@/components/Feed/FeedItem';
import { getFeeds } from '../../utils/api';

interface FeedType {
  id: string;
  description: string;
  likeCount: number;
  commentCount: number;
  feedImage: [
    {
      feedId: number;
      sortOrder: number;
      image: string;
    },
  ];
  comment: string[];
  tag: string[];
}

const Feed = () => {
  const { data } = useQuery(['feeds'], getFeeds);
  const feeds: FeedType[] = data?.data.data.items;
  return (
    <>
      <title>feed</title>
      <div className="main_container">
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
