import React, { useState } from 'react';
import { FeedImageType } from '@/core';
import FeedModal from '../common/FeedModal';
import Carousel from './Carousel';
import FeedImg from './FeedImg';

interface FeedItemImageCarouselProps {
  feedImages: FeedImageType[];
}

const FeedItemImageCarousel = ({ feedImages }: FeedItemImageCarouselProps) => {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  const onClickCarouselModalOpenHandler = () => {
    setIsImgModalOpen(true);
  };

  return (
    <>
      <div onClick={onClickCarouselModalOpenHandler}>
        <FeedImg feedImages={feedImages} />
      </div>
      <FeedModal
        isModalOpen={isImgModalOpen}
        onClickCloseModal={() => {
          setIsImgModalOpen(false);
        }}
      >
        <Carousel feedImages={feedImages} />
      </FeedModal>
    </>
  );
};

export default FeedItemImageCarousel;
