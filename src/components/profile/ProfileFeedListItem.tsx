import React, { useState } from 'react';
import Image from 'next/image';
import { FeedType } from '@/core/types/feed';
import Modal from '../common/Modal';
import styles from './ProfileFeedListItem.module.scss';
import ProfileFeedModal from './ProfileFeedModal';

interface ProfileFeedListItemProps {
  item: FeedType;
}

function ProfileFeedListItem({ item }: ProfileFeedListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.item} onClick={() => setIsModalOpen(true)}>
      <Modal
        headerText={item.description}
        isModalOpen={isModalOpen}
        onClickCloseModal={() => {
          setIsModalOpen(false);
        }}
      >
        <ProfileFeedModal feedItem={item} />
      </Modal>
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
      ></div>
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
