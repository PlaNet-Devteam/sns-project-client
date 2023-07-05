import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FeedImageType } from '@/core/types/feed';
interface FeedImgProps {
  feedImage: FeedImageType[];
}
const FeedImgModal = ({ feedImage }: FeedImgProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const TOTAL_SLIDES = feedImage.length - 1;
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.1s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);
  return (
    <div className="Carousel__container">
      <AiOutlineLeft className="Front-Btn" onClick={prevSlide}>
        앞
      </AiOutlineLeft>
      <div className="Img__container" ref={slideRef}>
        {feedImage.map((image: any) => (
          <Image
            src={image.image}
            className="Carousel__Img"
            alt="modal-img"
            width={1000}
            height={1000}
          />
        ))}
      </div>
      <AiOutlineRight className="Back-Btn" onClick={nextSlide}>
        뒤
      </AiOutlineRight>
    </div>
  );
};
export default FeedImgModal;
