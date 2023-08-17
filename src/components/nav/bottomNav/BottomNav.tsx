import React from 'react';
import IconNavFeed from '@/assets/icons/icon_nav_feed.svg';
import IconNavExplore from '@/assets/icons/icon_nav_explore.svg';
import IconNavAdd from '@/assets/icons/icon_nav_add.svg';
import IconNavDM from '@/assets/icons/icon_nav_dm.svg';
import IconNavProfile from '@/assets/icons/icon_nav_profile.svg';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useIsScrolling } from '@/hooks/useIsScrolling';
import BottomNavItem from './BottomNavItem';

const BottomNav = () => {
  const [username] = useLocalStorage('username', '');

  const bottmNavRoutes = [
    {
      path: '/feed',
      name: '메인피드',
      icon: <IconNavFeed />,
    },
    {
      path: '/explore',
      name: '피드검색',
      icon: <IconNavExplore />,
    },
    {
      path: '/feed/create',
      name: '피드생성',
      icon: <IconNavAdd />,
    },
    {
      path: '/message',
      name: '메세지',
      icon: <IconNavDM />,
    },
    {
      path: `/${username}`,
      name: '프로필',
      icon: <IconNavProfile />,
    },
  ];

  const isScrolling = useIsScrolling();

  return (
    <>
      {!isScrolling && (
        <div className="bottom-nav__container">
          <div className="bottom-nav">
            {bottmNavRoutes.map((nav) => (
              <BottomNavItem
                path={nav.path}
                name={nav.name}
                icon={nav.icon}
                key={nav.name}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
