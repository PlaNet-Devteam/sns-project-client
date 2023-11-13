import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dragEvent from '@/utils/dragEvent';
import useCarouselSize from '@/hooks/useCarouselSize';
import { feedImageState } from '@/store/feedAtom';
import { FeedImageType } from '@/core/types/feed';
import TypoText from '../common/TypoText';
import styles from './Carousel.module.scss';

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

  const translateWidth = useMemo(() => Math.ceil(width), [width]);

  return (
    <>
      <div className={styles.container} ref={ref}>
        <div className={styles.carousel}>
          <div className={styles.carousel_images}>
            <TypoText color="white">
              {ImageState + 1} / {feedImages.length}
            </TypoText>
            <div
              style={{
                transform: `translateX(${-ImageState * translateWidth}px)`,
                transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
              }}
              {...dragEvent({
                onDragChange: (deltaX) => {
                  setTransX(inrange(deltaX, -translateWidth, translateWidth));
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
              {feedImages.map((image: FeedImageType) => (
                <figure className={styles.carousel_image}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`}
                    alt="모달 이미지"
                    width={1000}
                    height={1000}
                    draggable={false}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Carousel;
