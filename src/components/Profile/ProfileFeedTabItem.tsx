import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { BaseProps } from '@/core/types/common';

interface ProfileFeedTabItemProps extends BaseProps {
  path: string;
}

function ProfileFeedTabItem({ path, children }: ProfileFeedTabItemProps) {
  const { pathname } = useRouter();

  return (
    <Link
      href={path}
      className={classNames('profile-feeds-tabs__tab', {
        'is-active': pathname === path,
      })}
    >
      {children}
    </Link>
  );
}

export default ProfileFeedTabItem;
