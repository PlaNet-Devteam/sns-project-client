import React from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import IconBookmark from '@/assets/icons/icon_bookmark.svg';
import IconFeed from '@/assets/icons/icon_feed.svg';
import { userState } from '@/store/userAtom';
import { UserType } from '@/core';
import useAuth from '@/hooks/useAuth';
import { profileState } from '@/store/profileAtom';
import ProfileFeedTabItem from './ProfileFeedTabItem';

function ProfileFeedTabs() {
  const user = useRecoilValue<UserType | null>(userState);
  const profile = useRecoilValue<UserType | null>(profileState);

  return (
    <>
      {profile && (
        <div className="profile-feeds-tabs">
          <ProfileFeedTabItem path={`/${profile?.username}`}>
            <IconFeed />
          </ProfileFeedTabItem>
          {profile?.username === user?.username && (
            <ProfileFeedTabItem path={`/${profile?.username}/bookmark`}>
              <IconBookmark />
            </ProfileFeedTabItem>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileFeedTabs;
