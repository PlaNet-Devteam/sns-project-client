import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import { userState } from '@/store/userAtom';
import { AxiosErrorResponseType, UserType, YN } from '@/core';
import useAuth from '@/hooks/useAuth';
import UserService from '@/services/user';
import { profileState } from '@/store/profileAtom';
import { feedModalState, isFeedModalOpenState } from '@/store/feedAtom';
import BottomNav from '../nav/bottomNav/BottomNav';
import ActivateUser from '../common/ActivateUser';
import FeedModal from '../common/FeedModal';
import ProfileFeedModal from '../profile/ProfileFeedModal';

const BaseLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const { payload } = useAuth();
  const [user, setUser] = useRecoilState<UserType | null>(userState);
  const profile = useRecoilValue<UserType | null>(profileState);

  const setFeedModalState = useSetRecoilState(feedModalState);
  const [isFeedModalOpen, setIsFeedModalOpen] =
    useRecoilState(isFeedModalOpenState);

  const onClickFeedModalOpenHandler = () => {
    setIsFeedModalOpen(false);
    setFeedModalState(null);
  };

  const { data: userInfo } = useQuery(
    ['user', payload?.username],
    () => {
      if (payload?.username === 'undefined') return router.push('/login');
      return UserService.getFindMe();
    },
    {
      onError: (error: AxiosErrorResponseType) => {
        if (error?.response?.status === 404) {
          // alert(error?.response?.data.message);
          // router.push('/_error');
        }
      },
    },
  );

  const isVisibleRoutes = [
    '/feed',
    `/${user?.username}`,
    `/${user?.username}/bookmark`,
    `/${profile?.username}`,
    '/explore',
    '/explore/feed',
  ];
  const { asPath } = useRouter();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo, setUser]);

  // * 계정 삭제 요청 상태 시 보여주는 화면
  if (userInfo?.delYn === YN.Y) {
    return (
      <main className="app-main">
        <div className="layout__container">
          <ActivateUser />
        </div>
      </main>
    );
  }

  return (
    <main className="app-main">
      <div className="layout__container">{children}</div>
      {isVisibleRoutes.includes(asPath) && <BottomNav />}
      <FeedModal
        isModalOpen={isFeedModalOpen}
        onClickCloseModal={onClickFeedModalOpenHandler}
      >
        <ProfileFeedModal />
      </FeedModal>
    </main>
  );
};

export default BaseLayout;
