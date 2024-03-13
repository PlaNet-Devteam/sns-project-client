import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { uploadFile } from '@/utils/uploadImage';
import {
  FeedImageCreateType,
  FeedCreateType,
  FeedFileType,
} from '@/core/types/feed';
import useForm from '@/hooks/useForm';
import FeedService from '@/services/feed';
import Button from '@/components/common/Button';
import { hashTagRegEx } from '@/utils/generateHashTag';
import TextAreaField from '@/components/common/form/TextAreaField';
import ThumbImage from '@/components/common/img/ThumbImage';
import ThumbCarousel from '@/components/common/img/ThumbCarousel';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import AddPhotoButton from '@/components/common/form/AddPhotoButton';
import ButtonGroup from '@/components/common/ButtonGroup';

function CreateFeed() {
  const router = useRouter();
  const [imageList, setImageList] = useState<FeedFileType[]>([]);
  const orderIndex = useRef<number>(0);

  const {
    formData: feedCreate,
    onChange,
    onReset,
  } = useForm<FeedCreateType>({
    description: '',
    feedImages: imageList,
    tagNames: [],
  });

  const { mutateAsync } = useMutation((formData: FeedCreateType) =>
    FeedService.createFeed(formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: FeedCreateType,
  ) => {
    event.preventDefault();

    if (imageList?.length === 0) {
      alert('사진을 첨부해주세요.');
      return;
    }

    try {
      let imageUrlLists: FeedImageCreateType[] = [];
      for (let i = 0; i < imageList.length; i++) {
        const currentImageUrl = await uploadFile(imageList[i].file, 'feed');
        const result: FeedImageCreateType = {
          sortOrder: imageList[i].sortOrder,
          image: currentImageUrl as string,
        };
        imageUrlLists = [...imageUrlLists, result];
      }

      await mutateAsync({
        ...formData,
        feedImages: imageUrlLists,
      });
      router.push('/feed');
      setImageList([]);
    } catch (error) {
      console.error(error);
    }

    console.log('imageList', imageList);
  };

  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageLists = event.target.files || [];

    let imageUrlLists = [...imageList];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      const result: FeedFileType = {
        sortOrder: orderIndex.current++,
        image: currentImageUrl as string,
        file: imageLists[i],
      };
      imageUrlLists = [...imageUrlLists, result];
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);

      alert('최대 5장까지 가능합니다.');
    }

    setImageList(imageUrlLists);
    console.log(imageList);
  };

  const onClickRemoveImageHandler = (index: number) => {
    setImageList((prev) => prev.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    if (feedCreate.description) {
      const hashTags = feedCreate.description
        .match(hashTagRegEx)
        ?.map((tag) => tag.slice(1));
      if (hashTags) {
        feedCreate.tagNames = hashTags;
      }
    }
  }, [feedCreate]);

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>새 피드</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <AddPhotoButton mutiple onUploadImage={onClickUploadImageHandler} />
          <ThumbCarousel>
            {imageList &&
              imageList.map((image, index) => (
                <ThumbImage
                  image={image}
                  index={index}
                  onClose={() => onClickRemoveImageHandler(index)}
                />
              ))}
          </ThumbCarousel>
          <form
            className="feed-create-form-content"
            onSubmit={(event) => onSubmitForm(event, feedCreate)}
          >
            <TextAreaField
              name="description"
              value={feedCreate.description}
              onReset={onReset}
              onChange={onChange}
              placeholder="내용을 입력해주세요."
            />
            <ButtonGroup>
              <Button
                size="md"
                variant="primary"
                type="submit"
                isEnglish
                isFull
                className="feed-create-form-complete__button"
              >
                OK
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </article>
    </>
  );
}
export default CreateFeed;
