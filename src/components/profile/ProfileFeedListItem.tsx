import React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { IoMdAlbums } from 'react-icons/io';
import {
  feedImageState,
  feedModalState,
  isFeedModalOpenState,
} from '@/store/feedAtom';
import { FeedType } from '@/core/types/feed';
import styles from './ProfileFeedListItem.module.scss';

interface ProfileFeedListItemProps {
  queryKey: unknown[];
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
      <div className={styles.item} onClick={onClickFeedModalOpenHandler}>
        <figure className={styles.image}>
          {item?.feedImages && item?.feedImages.length > 0 ? (
            <>
              {item?.feedImages.length > 1 && (
                <IoMdAlbums className={styles.icon} />
              )}
              <Image
                src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${item?.feedImages[0].image}`}
                alt=""
                width={200}
                height={200}
              />
            </>
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
