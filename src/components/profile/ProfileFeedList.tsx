import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ImSpinner6 } from 'react-icons/im';
import { FeedType } from '@/core/types/feed';
import FeedService from '@/services/feed';
import { useObserver } from '@/hooks/useObserver';
import { IntersectionObserverCallback } from '@/core/types/feed';
import EmptyData from '../common/EmptyData';
import ProfileFeedListItem from './ProfileFeedListItem';

interface ProfileFeedListProps {
  queryKey: string;
}

function ProfileFeedList({ queryKey }: ProfileFeedListProps) {
  const bottom = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { username } = router.query;

  const {
    data: myFeeds,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    [queryKey],
    ({ pageParam = 1 }) => {
      // TODO: useInfiniteQuery 리팩토링
      if (username) {
        return FeedService.findAllByUser(username, {
          page: pageParam,
          limit: 10,
        });
      }
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.pageInfo.isLast) return lastPage.pageInfo.page + 1;
        return undefined;
      },
    },
  );

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && status === 'success') {
      fetchNextPage();
    }
  };

  useObserver({
    ref: true,
    target: bottom,
    onIntersect,
  });

  if (myFeeds?.pages && myFeeds?.pages[0].totalCount === 0) {
    return (
      <>
        <EmptyData /> <div ref={bottom} />
      </>
    );
  }

  return (
    <>
      <div className="profile-feeds-list">
        {myFeeds &&
          myFeeds.pages.map((page) => (
            <>
              {page.items.map((feed: FeedType) => (
                <ProfileFeedListItem key={feed.id} item={feed} />
              ))}
            </>
          ))}
      </div>
      {bottom && <div ref={bottom} />}

      <div className="spinner_container">
        {status === 'success' && isFetchingNextPage ? (
          <ImSpinner6 className="spinner" />
        ) : null}
      </div>
    </>
  );
}

export default ProfileFeedList;
