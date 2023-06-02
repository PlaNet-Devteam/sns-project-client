import React from 'react';

interface FeedImageType {
  feedImage: [
    {
      feedId: number;
      sortOrder: number;
      image: string;
    },
  ];
}
interface ImageType {
  feedId: number;
  sortOrder: number;
  image: string;
}

function FeedImg(feedImage: FeedImageType) {
  const imageCount = feedImage.feedImage.length;
  let imageClassName = '';
  if (imageCount === 1) {
    imageClassName = 'single_image';
  } else if (imageCount === 2) {
    imageClassName = 'two_images';
  } else if (imageCount === 3) {
    imageClassName = 'three_images';
  } else if (imageCount === 4) {
    imageClassName = 'four_images';
  } else if (imageCount > 4) {
    imageClassName = 'more_images';
  }
  return (
    <>
      <div className={`feed_item ${imageClassName}`}>
        <div className="feed_images">
          {feedImage.feedImage
            .slice(0, 4)
            .map((image: ImageType, index: number) => (
              <div key={image.sortOrder}>
                <img className="feed_image" src={image.image} alt="" />
                {index === 3 && imageCount > 4 && (
                  <div className="more_button">+{imageCount - 4}</div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default FeedImg;
