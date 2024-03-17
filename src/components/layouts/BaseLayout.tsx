import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import { userState } from '@/store/userAtom';
import { AxiosErrorResponseType, UserType, YN } from '@/core';
import useAuth from '@/hooks/useAuth';
import UserService from '@/services/user';
import { profileState } from '@/store/profileAtom';
import {
  isFeedModalOpenState,
  isFeedShareModalOpenState,
} from '@/store/feedAtom';
import BottomNav from '../nav/bottomNav/BottomNav';
import ActivateUser from '../common/ActivateUser';
import FeedModal from '../common/FeedModal';
import ProfileFeedModal from '../profile/ProfileFeedModal';
import FeedShareModal from '../feed/FeedShareModal';

const BaseLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const { payload } = useAuth();
  const [user, setUser] = useRecoilState<UserType | null>(userState);
  const profile = useRecoilValue<UserType | null>(profileState);

  const [isFeedModalOpen, setIsFeedModalOpen] =
    useRecoilState(isFeedModalOpenState);

  const [isFeedShareModalOpen, setIsFeedShareModalOpen] = useRecoilState(
    isFeedShareModalOpenState,
  );

  const onClickFeedModalCloseHandler = () => {
    setIsFeedModalOpen(false);
  };

  const { data: userInfo } = useQuery(
    ['user', payload?.username],
    () => {
      if (payload) {
        return UserService.getFindMe();
      }
    },
    {
      onError: (error: AxiosErrorResponseType) => {
        console.error(error);
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
    `/explore/feed/tags/${encodeURIComponent(router.query.tagName as string)}`,
  ];
  const { asPath } = useRouter();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo, setUser]);

  useEffect(() => {
    setIsFeedModalOpen(false);
  }, [router.asPath, setIsFeedModalOpen]);

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
      {user && payload && isVisibleRoutes.includes(asPath) && <BottomNav />}
      <FeedModal
        isModalOpen={isFeedModalOpen}
        onClickCloseModal={onClickFeedModalCloseHandler}
      >
        <ProfileFeedModal />
      </FeedModal>
      <FeedShareModal
        isModalOpen={isFeedShareModalOpen}
        onClickCloseModal={() => setIsFeedShareModalOpen(false)}
      ></FeedShareModal>
    </main>
  );
};

export default BaseLayout;
