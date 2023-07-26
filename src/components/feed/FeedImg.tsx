import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { FeedImageType } from '@/core/types/feed';

interface FeedImgProps {
  feedImages: FeedImageType[];
  test?: boolean;
}

const FeedImg = ({ feedImages, test }: FeedImgProps) => {
  const imageCount = feedImages.length;

  return (
    <div className="feed-images__container">
      <div className="feed-images">
        {feedImages.slice(0, 4).map((image: FeedImageType, index: number) => {
          const moreImages = index + 1 === 3 && imageCount > 4;

          if (index % 2 === 0) {
            return (
              <div key={image.sortOrder} className="feed-images__column">
                <div className="feed-images__row">
                  <figure className="feed-images__image">
                    {!test ? (
                      <Image
                        src={image.image}
                        alt=""
                        width={400}
                        height={300}
                      />
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`}
                        alt=""
                        width={400}
                        height={300}
                      />
                    )}
                  </figure>
                </div>
                {feedImages[index + 1] && (
                  <div className={'feed-images__row'}>
                    <figure
                      className={classNames('feed-images__image', {
                        'feed-images__image--more': moreImages,
                      })}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${
                          feedImages[index + 1].image
                        }`}
                        alt=""
                        width={400}
                        height={300}
                      />
                    </figure>
                    {moreImages && (
                      <div className="feed-images_button">
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
