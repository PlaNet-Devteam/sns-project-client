import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BaseProps } from '@/core/types/common';
import JwtStorageService, {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '@/core/utils/jwt-storage';
import UserService from '@/services/user';
import ProfileInfo from '../Profile/ProfileInfo';
import ProfileCount from '../Profile/ProfileCount';
import ProfileFeedTabs from '../Profile/ProfileFeedTabs';

const ProfileLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const { data: profile } = useQuery(['user'], () => UserService.getFindMe());

  const onLogoutHandler = () => {
    JwtStorageService.removeToken(ACCESS_TOKEN);
    JwtStorageService.removeToken(REFRESH_TOKEN);
    router.replace('/login');
  };

  return (
    <>
      {profile && (
        <div className="profile-layout">
          <ProfileInfo profile={profile} />
          <ProfileCount profile={profile} />
          <section className="profile-feeds">
            <ProfileFeedTabs />
            {children}
          </section>
          <div>
            <button
              className="btn btn-primary btn-md en"
              onClick={onLogoutHandler}
            >
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileLayout;
