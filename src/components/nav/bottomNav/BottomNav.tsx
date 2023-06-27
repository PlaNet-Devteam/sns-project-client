import React, { useCallback, useEffect, useState } from 'react';
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
    ScrollDebounce();
  };
  const debounce = (callback: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback();
      }, delay);
    };
  };
  const ScrollDebounce = useCallback(
    debounce(async () => {
      try {
        setIsScrolling(false);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [isScrolling],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
