import React, { useEffect, useState } from 'react';
import IconNavFeed from '@/assets/icons/icon_nav_feed.svg';
import IconNavExplore from '@/assets/icons/icon_nav_explore.svg';
import IconNavAdd from '@/assets/icons/icon_nav_add.svg';
import IconNavDM from '@/assets/icons/icon_nav_dm.svg';
import IconNavProfile from '@/assets/icons/icon_nav_profile.svg';
import BottomNavItem from './BottomNavItem';

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
    path: '/profile',
    name: '프로필',
    icon: <IconNavProfile />,
  },
];

const BottomNav = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isScrolling]);

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
