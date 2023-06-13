import React from 'react';
import classNames from 'classnames';
import { FeedImageType } from '@/core/types/feed';

interface FeedImgProps {
  feedImage: FeedImageType[];
}

const FeedImg = ({ feedImage }: FeedImgProps) => {
  const imageCount = feedImage.length;
  return (
    <div className="feed-images__container">
      <div className="feed-images">
        {feedImage.slice(0, 4).map((image: FeedImageType, index: number) => {
          const moreImages = index + 1 === 3 && imageCount > 4;

          if (index % 2 === 0) {
            return (
              <div key={image.sortOrder} className="feed-images__column">
                <div className="feed-images__row">
                  <figure className="feed-images__image">
                    <img src={image.image} />
                  </figure>
                </div>
                {feedImage[index + 1] && (
                  <div className={'feed-images__row'}>
                    <figure
                      className={classNames('feed-images__image', {
                        'feed-images__image--more': moreImages,
                      })}
                    >
                      <img src={feedImage[index + 1].image} />
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
