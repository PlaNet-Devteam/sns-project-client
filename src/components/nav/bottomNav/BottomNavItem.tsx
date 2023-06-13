import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface BottomNavItemProps {
  path: string;
  name: string;
  icon: ReactNode;
}

const BottomNavItem = ({ path, name, icon }: BottomNavItemProps) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={path}
      className={classNames('bottom-nav__link', {
        'bottom-nav__link--active': pathname === path,
      })}
    >
      <span className="bottom-nav__icon">{icon}</span>
      <span className="bottom-nav__text">{name}</span>
    </Link>
  );
};

export default BottomNavItem;
