import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IoMdAlbums } from 'react-icons/io';
import {
  feedImageState,
  feedModalState,
  isFeedModalOpenState,
} from '@/store/feedAtom';
import { FeedType } from '@/core/types/feed';
import BaseImage from '../common/img/BaseImage';
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
          {item?.feedImages && item?.feedImages.length > 0 && (
            <>
              {item?.feedImages.length > 1 && (
                <IoMdAlbums className={styles.icon} />
              )}
              <BaseImage
                src={`${item?.feedImages[0].image}`}
                alt=""
                width={200}
                height={200}
              />
            </>
          )}
        </figure>
      </div>
    </>
  );
}

export default ProfileFeedListItem;
