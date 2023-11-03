import React from 'react';
import { useRouter } from 'next/router';
import { ImSpinner6 } from 'react-icons/im';
import { FeedType } from '@/core/types/feed';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import FeedService from '@/services/feed';
import useAuth from '@/hooks/useAuth';
import EmptyData from '../common/EmptyData';
import ProfileFeedListItem from './ProfileFeedListItem';

interface ProfileFeedListProps {
  queryKey: string;
}

function ProfileFeedList({ queryKey }: ProfileFeedListProps) {
  const router = useRouter();
  const { username } = router.query;
  const { payload } = useAuth();

  const {
    data: myFeeds,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll<FeedType>([`${queryKey}-${username}`], (page) =>
    FeedService.findAllByUser(username, {
      page,
      limit: 9,
      viewerId: payload?._id,
    }),
  );

  if (myFeeds?.pages[0].totalCount === 0) {
    return (
      <>
        <EmptyData /> <div ref={bottom} />
      </>
    );
  }

  return (
    <>
      <div className="profile-feeds-list">
        {myFeeds?.pages.map((page, index) => (
          <div key={index}>
            {page.items.map((feed) => (
              <ProfileFeedListItem key={feed.id} item={feed} />
            ))}
          </div>
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
