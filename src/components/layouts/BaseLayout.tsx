import React from 'react';
import { useRouter } from 'next/router';
import { BaseProps } from '@/core/types/common';
import BottomNav from '../nav/bottomNav/BottomNav';

const BaseLayout = ({ children }: BaseProps) => {
  const isVisibleRoutes = [
    '/feed',
    '/profile',
    '/profile/bookmark',
    '/explore',
  ];
  const { pathname } = useRouter();

  return (
    <main className="app-main">
      <div className="layout__container">{children}</div>
      {isVisibleRoutes.includes(pathname) && <BottomNav />}
    </main>
  );
};

export default BaseLayout;
