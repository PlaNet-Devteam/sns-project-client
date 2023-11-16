import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { FeedImageType } from '@/core/types/feed';
import useForm from '@/hooks/useForm';
import FeedService from '@/services/feed';
import Button from '@/components/common/Button';
import { feedState } from '@/store/feedAtom';
import { FeedUpdateType } from '@/core/types/feed/feed-update.interface';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import ThumbCarousel from '@/components/common/img/ThumbCarousel';
import ThumbImage from '@/components/common/img/ThumbImage';
import ButtonGroup from '@/components/common/ButtonGroup';
import TextAreaField from '@/components/common/form/TextAreaField';
import { hashTagRegEx } from '@/utils/generateHashTag';

function ModifyFeed() {
  const router = useRouter();
  const feedItem = useRecoilValue(feedState);
  const [imageList, setImageList] = useState<FeedImageType[]>(
    feedItem?.feedImages || [],
  );

  const {
    formData: feedUpdate,
    onChange,
    onReset,
  } = useForm<FeedUpdateType>({
    description: feedItem?.description || '',
    feedImages: imageList,
    tagNames: [],
  });

  const { mutateAsync } = useMutation((formData: FeedUpdateType) =>
    FeedService.updateFeed(feedItem?.id || 0, formData),
  );

  useEffect(() => {
    if (feedUpdate.description) {
      const hashTags = feedUpdate.description
        .match(hashTagRegEx)
        ?.map((tag) => tag.slice(1));
      if (hashTags) {
        feedUpdate.tagNames = [...hashTags];
      } else {
        feedUpdate.tagNames = [];
      }
    }
  }, [feedUpdate]);

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: FeedUpdateType,
  ) => {
    event.preventDefault();

    try {
      await mutateAsync({
        ...formData,
      });
      setImageList([]);
      router.push('/feed');
    } catch (error: any) {
      console.log('error?.response', error?.response);
    }
  };

  const onClickRemoveImageHandler = (index: number) => {
    if (imageList.length > 1) {
      setImageList((prevState) => prevState.filter((_, idx) => idx !== index));
      if (feedItem) {
        FeedService.deleteFeedImage(feedItem.id, index);
      }
    } else {
      alert('이미지를 1개 이상 등록해야합니다');
    }
  };

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>피드 수정</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>

      <article className="article__container">
        <div className="inner__container">
          <ThumbCarousel>
            {imageList &&
              imageList.map((image, index) => (
                <ThumbImage
                  image={{
                    image: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`,
                    sortOrder: image.sortOrder,
                  }}
                  index={index}
                  onClose={() => onClickRemoveImageHandler(index)}
                />
              ))}
          </ThumbCarousel>
          <form onSubmit={(event) => onSubmitForm(event, feedUpdate)}>
            <TextAreaField
              name="description"
              placeholder="내용을 입력해주세요."
              value={feedUpdate.description}
              onChange={onChange}
              onReset={onReset}
            />
            <ButtonGroup>
              <Button
                size="md"
                variant="primary"
                type="submit"
                isEnglish
                isFull
              >
                EDIT
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </article>
    </>
  );
}
export default ModifyFeed;
