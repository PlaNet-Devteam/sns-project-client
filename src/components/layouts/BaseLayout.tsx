import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { BaseProps } from '@/core/types/common';
import { userState } from '@/store/userAtom';
import { AxiosErrorResponseType, UserType } from '@/core';
import useAuth from '@/hooks/useAuth';
import UserService from '@/services/user';
import { profileState } from '@/store/profileAtom';
import BottomNav from '../nav/bottomNav/BottomNav';

const BaseLayout = ({ children }: BaseProps) => {
  const router = useRouter();
  const { payload } = useAuth();
  const [user, setUser] = useRecoilState<UserType | null>(userState);
  const profile = useRecoilValue<UserType | null>(profileState);

  const { data: userInfo } = useQuery(
    ['user', payload?.username],
    () => {
      if (payload?.username === 'undefined') return router.push('/login');
      return UserService.findUserByUsername(payload?.username as string);
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

  const isVisibleRoutes = [
    '/feed',
    `/${user?.username}`,
    `/${user?.username}/bookmark`,
    `/${profile?.username}`,
    '/explore',
  ];
  const { asPath } = useRouter();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo, setUser]);

  return (
    <main className="app-main">
      <div className="layout__container">{children}</div>
      {isVisibleRoutes.includes(asPath) && <BottomNav />}
    </main>
  );
};

export default BaseLayout;
