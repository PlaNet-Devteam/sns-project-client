import { useState } from 'react';
import Image from 'next/image';
import dragEvent from '@/utils/dragEvent';
import useCarouselSize from '@/hooks/useCarouselSize';

interface FeedImgProps {
  feedImage: any;
}

const Carousel = ({ feedImage }: FeedImgProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const { ref, width } = useCarouselSize();

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

  return (
    <>
      <div className="Main__container" ref={ref}>
        <div
          className="flex"
          style={{
            transform: `translateX(${-currentIndex * width + transX}px)`,
            transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
          }}
          {...dragEvent({
            onDragChange: (deltaX) => {
              setTransX(inrange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const maxIndex = feedImage.length - 1;

              if (deltaX < -100)
                setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
              if (deltaX > 100)
                setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));

              setTransX(0);
            },
          })}
        >
          <div className="Carousel__container">
            <div className="Img__container">
              {feedImage.map((image: any) => (
                <Image
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`}
                  className="Carousel__Img"
                  alt="modal-img"
                  width={1000}
                  height={1000}
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Carousel;
