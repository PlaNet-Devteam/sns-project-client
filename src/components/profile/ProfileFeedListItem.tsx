import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FeedType } from '@/core/types/feed';
import styles from './ProfileFeedListItem.module.scss';

interface ProfileFeedListItemProps {
  item: FeedType;
}

function ProfileFeedListItem({ item }: ProfileFeedListItemProps) {
  const router = useRouter();
  const handleClickListItem = () => {
    router.push(
      {
        pathname: '/[username]/feed',
        query: { username: router.query.username },
      },
      `/${router.query.username}/feed#${item.id}`,
    );
  };

  return (
    <div className={styles.item} onClick={handleClickListItem}>
      <figure className={styles.item__image}>
        {item?.feedImages && item?.feedImages.length > 0 ? (
          item?.feedImages[0] && (
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${item?.feedImages[0].image}`}
              alt=""
              width={200}
              height={200}
            />
          )
        ) : (
          <Image
            src={'/img/icons/icon_default_profile.svg'}
            alt=""
            width={200}
            height={200}
          />
        )}
      </figure>
    </div>
  );
}

export default ProfileFeedListItem;
