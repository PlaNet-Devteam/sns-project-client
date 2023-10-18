import { useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dragEvent from '@/utils/dragEvent';
import useCarouselSize from '@/hooks/useCarouselSize';
import { feedImageState } from '@/store/feedAtom';
import { FeedImageType } from '@/core/types/feed';

interface FeedImgProps {
  feedImages: FeedImageType[];
}

const Carousel = ({ feedImages }: FeedImgProps) => {
  const [transX, setTransX] = useState(0);
  const ImageState = useRecoilValue(feedImageState);
  const setImageState = useSetRecoilState(feedImageState);
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
            transform: `translateX(${-ImageState * width + transX}px)`,
            transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
          }}
          {...dragEvent({
            onDragChange: (deltaX) => {
              setTransX(inrange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const maxIndex = feedImages.length - 1;

              if (deltaX < -100)
                setImageState(inrange(ImageState + 1, 0, maxIndex));
              if (deltaX > 100)
                setImageState(inrange(ImageState - 1, 0, maxIndex));

              setTransX(0);
            },
          })}
        >
          <div className="Carousel__container">
            <div className="Img__container">
              {feedImages.map((image: FeedImageType) => (
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
