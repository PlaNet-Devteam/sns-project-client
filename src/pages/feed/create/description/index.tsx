import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { feedImageState } from '@/store/feedAtom';
import { FeedCreateType, FeedImageType } from '@/core/types/feed';
import FeedService from '@/services/feed';
import { FEED_STATUS } from '@/core/enum/feed';
import useForm from '@/hooks/useForm';
import Button from '@/components/common/Button';
import FeedHeader from '../../../../components/feed/FeedHeader';

function CreateFeedDescription() {
  const router = useRouter();
  const [imageList, setImageList] =
    useRecoilState<FeedImageType[]>(feedImageState);

  const { formData: feedCreate, onChange } = useForm<FeedCreateType>({
    userId: 1,
    description: '',
    feedImages: imageList,
    status: FEED_STATUS.ACTIVE,
  });

  const { mutateAsync } = useMutation((formData: FeedCreateType) =>
    FeedService.createFeed(formData),
  );

  console.log('imageList', imageList);
  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: FeedCreateType,
  ) => {
    event.preventDefault();

    try {
      await mutateAsync(formData);
      router.push('/feed');
      setImageList([]);
    } catch (error: any) {
      console.log('error?.response', error?.response);
    }
  };

  return (
    <div className="feed-create">
      <div className="feed-create-form-description inner__container">
        <FeedHeader
          back="뒤로"
          backLink="/feed/create"
          title="새 게시물"
          next="확인"
          nextLink="create/description"
        />
        <div className="feed-create-form-description__image">
          {imageList &&
            imageList.map((image) => (
              <Image
                src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`}
                key={image.sortOrder}
                width={200}
                height={200}
                alt="image"
              />
            ))}
        </div>
        <form onSubmit={(event) => onSubmitForm(event, feedCreate)}>
          <textarea
            className="feed-create-description__textarea"
            name="description"
            placeholder="내용을 입력해주세요."
            value={feedCreate.description}
            onChange={onChange}
          />
          <Button size="md" variant="primary" type="submit" isEnglish isFull>
            CREATE FEED
          </Button>
        </form>
      </div>
    </div>
  );
}
export default CreateFeedDescription;
