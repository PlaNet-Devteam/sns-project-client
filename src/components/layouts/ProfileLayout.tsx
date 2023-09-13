import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import UserService from '@/services/user';
import { userState } from '@/store/userAtom';
import { AxiosErrorResponseType } from '@/core/types/error/axios-error-response.type';
import useAuth from '@/hooks/useAuth';
import ProfileInfo from '../profile/ProfileInfo';
import ProfileCount from '../profile/ProfileCount';
import ProfileFeedTabs from '../profile/ProfileFeedTabs';
import Button from '../common/Button';
import TopHeader from '../nav/topHeader/TopHeader';

const ProfileLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const { payload, onLogout } = useAuth();
  const setUser = useSetRecoilState(userState);

  const { data: profile } = useQuery(
    ['user', router.query.username],
    () => {
      if (router.query.username === 'undefined') return router.push('/login');
      return UserService.findUserByUsername(
        (router.query.username as string) || (payload?.username as string),
      );
    },
    {
      onError: (error: AxiosErrorResponseType) => {
        if (error?.response?.status === 404) {
          alert(error?.response?.data.message);
        }
        router.push('/_error');
      },
    },
  );

  const onLogoutHandler = () => {
    onLogout();
  };

  useEffect(() => {
    setUser(profile);
  }, [profile, setUser]);

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>
          <h1 className="blind">프로필</h1>
        </TopHeader.Title>
        <TopHeader.Right>
          {profile && (
            <>
              {payload?.username === profile.username && (
                <button onClick={() => router.push('/profile/edit')}>
                  편집
                </button>
              )}
            </>
          )}
        </TopHeader.Right>
      </TopHeader>
      {profile && (
        <div className="profile-layout">
          <ProfileInfo profile={profile} />
          {payload?.username === profile.username && (
            <div className="text-center">
              <Button
                size="sm"
                variant="primary"
                type="button"
                isEnglish
                onClick={onLogoutHandler}
              >
                LOGOUT
              </Button>
            </div>
          )}
          <ProfileCount profile={profile} />
          <section className="profile-feeds">
            <ProfileFeedTabs />
            {children}
          </section>
        </div>
      )}
    </>
  );
};

export default ProfileLayout;
