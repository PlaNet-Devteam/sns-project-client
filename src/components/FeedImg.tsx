import React from 'react';

interface Feed {
  id: string;
  description: string;
  likeCount: number;
  commentCount: number;
  feedImage: string[];
  comment: string[];
  tag: string[];
}

function FeedImg(feedImage: any) {
  const imageCount = feedImage.feedImage.length;
  let imageClassName = '';
  if (imageCount === 1) {
    imageClassName = 'single_image';
  } else if (imageCount === 2) {
    imageClassName = 'two_images';
  } else if (imageCount === 3) {
    imageClassName = 'three_images';
  } else if (imageCount >= 4) {
    imageClassName = 'four_or_more_images';
  }
  return (
    <>
      <div className={`feed_item ${imageClassName}`}>
        <div className="feed_images">
          {feedImage.feedImage.slice(0, 4).map((image: any) => (
            <img
              className="feed_image"
              key={image.sortOrder}
              src={image.image}
              alt=""
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default FeedImg;
