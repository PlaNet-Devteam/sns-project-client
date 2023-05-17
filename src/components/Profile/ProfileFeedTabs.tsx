import React from 'react';
import IconFeed from '@/assets/icons/icon_feed.svg';
import IconBookmark from '@/assets/icons/icon_bookmark.svg';
import ProfileFeedTabItem from './ProfileFeedTabItem';

function ProfileFeedTabs() {
  return (
    <div className="profile-feeds-tabs">
      <ProfileFeedTabItem path="/profile">
        <IconFeed />
      </ProfileFeedTabItem>
      <ProfileFeedTabItem path="/profile/bookmark">
        <IconBookmark />
      </ProfileFeedTabItem>
    </div>
  );
}

export default ProfileFeedTabs;
