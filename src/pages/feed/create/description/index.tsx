import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { feedImageState } from '@/store/feedState';
import FeedHeader from '../../../../components/feed/FeedHeader';

function CreateFeedDescription() {
  const imageList = useRecoilValue(feedImageState);
  return (
    <div className="feed-create">
      <div className="feed-create-form-description layout_padding">
        <FeedHeader
          back="뒤로"
          backLink="/feed/create"
          title="새 게시물"
          next="확인"
          nextLink="create/description"
        />
        <div className="feed-create-form-description__image">
          {imageList?.[0] ? (
            <Image src={imageList[0]} width={200} height={200} alt="image" />
          ) : (
            '이미지가 없습니다.'
          )}
        </div>
        <textarea
          className="feed-create-description__textarea"
          placeholder="내용을 입력해주세요."
        />
      </div>
    </div>
  );
}
export default CreateFeedDescription;
