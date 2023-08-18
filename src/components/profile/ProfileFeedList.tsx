import React from 'react';
import { useRouter } from 'next/router';
import { ImSpinner6 } from 'react-icons/im';
import { FeedType } from '@/core/types/feed';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import EmptyData from '../common/EmptyData';
import ProfileFeedListItem from './ProfileFeedListItem';

interface ProfileFeedListProps {
  queryKey: string;
}

function ProfileFeedList({ queryKey }: ProfileFeedListProps) {
  const router = useRouter();
  const { username } = router.query;

  const {
    data: myFeeds,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll(queryKey, username);

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
