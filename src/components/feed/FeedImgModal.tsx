import { FeedImageType } from '@/core/types/feed';
import Carousel from './Carousel';
interface FeedImgProps {
  feedImage: FeedImageType[] | undefined;
}
const FeedImgModal = ({ feedImage }: FeedImgProps) => {
  return (
    <>
      <Carousel feedImage={feedImage} />
    </>
  );
};
export default FeedImgModal;
