import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { BaseProps } from '@/core/types/common';

interface ProfileFeedTabItemProps extends BaseProps {
  path: string;
}

function ProfileFeedTabItem({ path, children }: ProfileFeedTabItemProps) {
  const { asPath } = useRouter();

  return (
    <Link
      href={path}
      className={classNames('profile-feeds-tabs__tab', {
        'profile-feeds-tabs__tab--active': asPath === path,
      })}
    >
      {children}
    </Link>
  );
}

export default ProfileFeedTabItem;
