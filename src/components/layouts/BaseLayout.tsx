import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { BaseProps } from '@/core/types/common';
import { userState } from '@/store/userAtom';
import { UserType } from '@/core';
import BottomNav from '../nav/bottomNav/BottomNav';

const BaseLayout = ({ children }: BaseProps) => {
  const user = useRecoilValue<UserType | null>(userState);

  const isVisibleRoutes = [
    '/feed',
    `/${user?.username}`,
    `/${user?.username}/bookmark`,
    '/explore',
  ];
  const { asPath } = useRouter();

  return (
    <main className="app-main">
      <div className="layout__container">{children}</div>
      {isVisibleRoutes.includes(asPath) && <BottomNav />}
    </main>
  );
};

export default BaseLayout;
