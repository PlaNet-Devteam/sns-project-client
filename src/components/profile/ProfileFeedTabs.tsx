import React from 'react';
import { useRecoilValue } from 'recoil';
import { BsBookmark, BsBookmarkFill, BsGrid, BsGridFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { userState } from '@/store/userAtom';
import { UserType } from '@/core';
import { profileState } from '@/store/profileAtom';
import ProfileFeedTabItem from './ProfileFeedTabItem';

function ProfileFeedTabs() {
  const { asPath } = useRouter();
  const user = useRecoilValue<UserType | null>(userState);
  const profile = useRecoilValue<UserType | null>(profileState);

  return (
    <>
      {profile && (
        <div className="profile-feeds-tabs">
          <ProfileFeedTabItem path={`/${profile?.username}`}>
            {asPath === `/${profile?.username}` ? (
              <BsGridFill size={'1.5rem'} />
            ) : (
              <BsGrid size={'1.5rem'} />
            )}
          </ProfileFeedTabItem>
          {profile?.username === user?.username && (
            <ProfileFeedTabItem path={`/${profile?.username}/bookmark`}>
              {asPath === `/${profile?.username}/bookmark` ? (
                <BsBookmarkFill size={'1.5rem'} />
              ) : (
                <BsBookmark size={'1.5rem'} />
              )}
            </ProfileFeedTabItem>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileFeedTabs;
