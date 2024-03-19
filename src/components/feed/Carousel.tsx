import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Slider from 'react-slick';
import { feedImageState } from '@/store/feedAtom';
import { FeedImageType } from '@/core/types/feed';
import TypoText from '../common/TypoText';
import styles from './Carousel.module.scss';

interface FeedImgProps {
  feedImages: FeedImageType[];
}

const Carousel = ({ feedImages }: FeedImgProps) => {
  const ImageState = useRecoilValue(feedImageState);
  const setImageState = useSetRecoilState(feedImageState);

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: ImageState,
    afterChange: (currentSlide: number | ((currVal: number) => number)) => {
      setImageState(currentSlide);
    },
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <TypoText color="white">
            {ImageState + 1} / {feedImages.length}
          </TypoText>
          <Slider className={styles.carousel_images} {...settings}>
            {feedImages.map((image: FeedImageType, index: number) => (
              <div className={styles.carousel_image} key={index + 1}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`}
                  alt="모달 이미지"
                  width={1000}
                  height={1000}
                  draggable={false}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default Carousel;
