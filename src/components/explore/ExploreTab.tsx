import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import styles from './ExploreTab.module.scss';

const ExploreTab = () => {
  const { asPath } = useRouter();

  return (
    <div className={styles.tabs}>
      <Link
        href="/explore"
        className={classnames(styles.tab, {
          [styles.active]: asPath === '/explore',
        })}
      >
        @ 사용자
      </Link>
      <Link
        href="/explore/feed"
        className={classnames(styles.tab, {
          [styles.active]: asPath === '/explore/feed',
        })}
      >
        # 태그
      </Link>
    </div>
  );
};

export default ExploreTab;
