import React from 'react';
import Link from 'next/link';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FeedType } from '@/core';
import { formattedDate } from '@/utils/formattedDate';
import UserProfileImage from '../common/UserProfileImage';
import styles from './FeedItemProfileInfo.module.scss';

interface FeedItemProfileInfoProps {
  item: FeedType;
  onClickOptions?: () => void;
}

const FeedItemProfileInfo = ({
  item,
  onClickOptions,
}: FeedItemProfileInfoProps) => {
  const convertedDate = formattedDate()(item.updatedAt || item.createdAt);

  return (
    <div className={styles.info}>
      <div className={styles.info_profile}>
        <figure className={styles.info_profileImage}>
          <UserProfileImage
            username={item.user.username}
            imagePath={item.user.profileImage}
          />
        </figure>
        <div className={styles.info_profileInfo}>
          <div className={styles.username}>
            <Link href={`/${item.user?.username}`}>{item.user?.username}</Link>
          </div>
          <div className={styles.time}>{convertedDate}</div>
        </div>
      </div>
      <div className={styles.options}>
        <button onClick={onClickOptions}>
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};

export default FeedItemProfileInfo;
