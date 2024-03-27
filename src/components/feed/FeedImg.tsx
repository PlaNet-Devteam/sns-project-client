import React from 'react';
import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';
import { FeedImageIndexType, FeedImageType } from '@/core/types/feed';
import { feedImageState } from '@/store/feedAtom';
import BaseImage from '../common/img/BaseImage';
import styles from './FeedImg.module.scss';

interface FeedImgProps {
  feedImages: FeedImageType[];
}

const FeedImg = ({ feedImages }: FeedImgProps) => {
  const setImageState = useSetRecoilState(feedImageState);
  const imageCount = feedImages.length;
  const modifiedFeedImages: FeedImageIndexType[] = feedImages.map(
    (image, index) => ({
      ...image,
      firIndex: index,
      secIndex: index + 1,
    }),
  );

  return (
    <div className={styles.contianer}>
      <div className={styles.images}>
        {modifiedFeedImages.slice(0, 4).map((image, index) => {
          const moreImages = index + 1 === 3 && imageCount > 4;

          if (index % 2 === 0) {
            return (
              <div key={image.sortOrder} className={styles.images_column}>
                <div className={styles.images_row}>
                  <figure
                    className={styles.images_image}
                    onClick={() => setImageState(image.firIndex)}
                  >
                    <BaseImage
                      src={`${image.image}`}
                      alt={String(image.sortOrder)}
                      width={400}
                      height={300}
                    />
                  </figure>
                </div>
                {feedImages[index + 1] && (
                  <div className={styles.images_row}>
                    <figure
                      className={classNames(styles.images_image, {
                        [styles.images_image_more]: moreImages,
                      })}
                      onClick={() => setImageState(image.secIndex)}
                    >
                      <BaseImage
                        src={`${feedImages[index + 1].image}`}
                        alt=""
                        width={400}
                        height={300}
                      />
                    </figure>
                    {moreImages && (
                      <div
                        className={styles.images_button}
                        onClick={() => setImageState(0)}
                      >
                        +{imageCount - 4}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default FeedImg;
