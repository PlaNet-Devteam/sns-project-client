import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
interface FeedImgProps {
  feedImage: any;
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
      slideRef.current.style.transform = `translateX(-${
        currentSlide * (100 / feedImage.length)
      }%)`;
    }
  }, [currentSlide]);
  console.log('총 이미지 수' + feedImage.length);
  console.log('현재 슬라이드 ' + currentSlide);
  return (
    <div className="Modal__container">
      <AiOutlineLeft className="Front-Btn" onClick={prevSlide} />
      <div className="Carousel__container">
        <div className="Img__container" ref={slideRef}>
          {feedImage.map((image: any) => (
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`}
              className="Carousel__Img"
              alt="modal-img"
              width={1000}
              height={1000}
            />
          ))}
        </div>
      </div>
      <AiOutlineRight className="Back-Btn" onClick={nextSlide} />
    </div>
  );
};
export default FeedImgModal;
