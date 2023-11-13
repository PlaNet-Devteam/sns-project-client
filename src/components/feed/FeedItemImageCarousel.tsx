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

  const openModalIfImgCnt = () => {
    if (feedImages) {
      feedImages.length > 1 ? setIsImgModalOpen(true) : null;
    }
  };

  return (
    <>
      <div onClick={openModalIfImgCnt}>
        <FeedImg feedImages={feedImages} />
      </div>
      <FeedModal
        modalPurpose="Img"
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
