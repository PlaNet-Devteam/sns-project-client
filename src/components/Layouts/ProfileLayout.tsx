import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import { USER_API } from '@/core';
import { api } from '@/core/base.service';
import JwtStorageService from '@/core/utils/jwt-storage';
import ProfileInfo from '../Profile/ProfileInfo';
import ProfileCount from '../Profile/ProfileCount';
import ProfileFeedTabs from '../Profile/ProfileFeedTabs';

// TODO : API 함수 호출하는 부분 서비스 관심사 분리
const getFindMe = async () => {
  const { data } = await api.get(USER_API.FIND_ME);
  return data.data;
};

const ProfileLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const { data: profile } = useQuery(['user'], () => getFindMe());

  const onLogoutHandler = () => {
    JwtStorageService.removeToken();
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
