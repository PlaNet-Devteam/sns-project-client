import React from 'react';
import { useRecoilValue } from 'recoil';
import IconBookmark from '@/assets/icons/icon_bookmark.svg';
import IconFeed from '@/assets/icons/icon_feed.svg';
import { userState } from '@/store/userAtom';
import { UserType } from '@/core';
import ProfileFeedTabItem from './ProfileFeedTabItem';

function ProfileFeedTabs() {
  const user = useRecoilValue<UserType | null>(userState);

  return (
    <>
      {user && (
        <div className="profile-feeds-tabs">
          <ProfileFeedTabItem path={`/${user.username}`}>
            <IconFeed />
          </ProfileFeedTabItem>
          <ProfileFeedTabItem path={`/${user.username}/bookmark`}>
            <IconBookmark />
          </ProfileFeedTabItem>
        </div>
      )}
    </>
  );
}

export default ProfileFeedTabs;
