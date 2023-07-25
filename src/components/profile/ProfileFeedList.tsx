import React from 'react';
import { FeedType } from '@/core/types/feed';
import EmptyData from '../common/EmptyData';
import ProfileFeedListItem from './ProfileFeedListItem';

interface ProfileFeedList {
  feeds: FeedType[];
}

function ProfileFeedList({ feeds }: ProfileFeedList) {
  if (feeds.length === 0) {
    return <EmptyData />;
  }

  return (
    <>
      {feeds && (
        <div className="profile-feeds-list">
          {feeds &&
            feeds.map((feed) => (
              <ProfileFeedListItem item={feed} key={feed.id} />
            ))}
        </div>
      )}
    </>
  );
}

export default ProfileFeedList;
