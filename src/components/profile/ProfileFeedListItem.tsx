import React from 'react';
import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  feedImageState,
  feedModalState,
  isFeedModalOpenState,
} from '@/store/feedAtom';
import { FeedType } from '@/core/types/feed';
import FeedModal from '../common/FeedModal';
import ProfileFeedModal from './ProfileFeedModal';

interface ProfileFeedListItemProps {
  queryKey: string[];
  item: FeedType;
}

function ProfileFeedListItem({ queryKey, item }: ProfileFeedListItemProps) {
  const setImageState = useSetRecoilState(feedImageState);
  const setFeedModalState = useSetRecoilState(feedModalState);
  const setIsFeedModalOpenState = useSetRecoilState(isFeedModalOpenState);

  const onClickFeedModalOpenHandler = () => {
    setImageState(0);
    setIsFeedModalOpenState(true);
    setFeedModalState((prevState) => ({
      ...prevState,
      queryKey: [...queryKey],
      id: item.id,
    }));
  };

  return (
    <>
      <div
        className={'profile-feed-item'}
        onClick={onClickFeedModalOpenHandler}
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
