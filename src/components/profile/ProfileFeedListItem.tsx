import React, { useState } from 'react';
import Image from 'next/image';
import { FeedType } from '@/core/types/feed';
import FeedModal from '../common/FeedModal';
import styles from './ProfileFeedListItem.module.scss';
import ProfileFeedModal from './ProfileFeedModal';

interface ProfileFeedListItemProps {
  item: FeedType;
}

function ProfileFeedListItem({ item }: ProfileFeedListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FeedModal
        modalPurpose="Feed"
        headerText={item.description}
        isModalOpen={isModalOpen}
        onClickCloseModal={() => {
          setIsModalOpen(false);
        }}
      >
        <ProfileFeedModal feedItem={item} />
      </FeedModal>
      <div className={styles.item} onClick={() => setIsModalOpen(true)}>
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
    </>
  );
}

export default ProfileFeedListItem;
