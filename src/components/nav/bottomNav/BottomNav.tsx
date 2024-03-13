import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import IconNavFeed from '@/assets/icons/icon_nav_feed.svg';
import IconNavExplore from '@/assets/icons/icon_nav_explore.svg';
import IconNavAdd from '@/assets/icons/icon_nav_add.svg';
import IconNavDM from '@/assets/icons/icon_nav_dm.svg';
import IconNavProfile from '@/assets/icons/icon_nav_profile.svg';
import { useIsScrolling } from '@/hooks/useIsScrolling';
import { userState } from '@/store/userAtom';
import useAuth from '@/hooks/useAuth';
import BottomNavItem from './BottomNavItem';

const BottomNav = () => {
  const { payload } = useAuth();
  const user = useRecoilValue(userState);
  const [username, setUsername] = useState(user?.username);

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
      path: username ? '/feed/create' : '/login',
      name: '피드생성',
      icon: <IconNavAdd />,
    },
    {
      path: '/direct/inbox',
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

  useEffect(() => {
    if (payload) {
      setUsername(payload.username);
    }
  }, [payload]);

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
