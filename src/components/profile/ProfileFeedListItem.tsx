import React, { useState } from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { feedImageState } from '@/store/feedAtom';
import { FeedType } from '@/core/types/feed';
import FeedModal from '../common/FeedModal';
import ProfileFeedModal from './ProfileFeedModal';

interface ProfileFeedListItemProps {
  item: FeedType;
}

function ProfileFeedListItem({ item }: ProfileFeedListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setImageState = useSetRecoilState(feedImageState);

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
        <ProfileFeedModal item={item} />
      </FeedModal>
      <div
        className={'profile-feed-item'}
        onClick={() => {
          setImageState(0);
          setIsModalOpen(true);
        }}
      >
        <figure className={'profile-feed-item__image'}>
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
