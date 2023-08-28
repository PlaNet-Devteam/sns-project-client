import Image from 'next/image';
import { useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineCamera } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { uploadFile } from '@/utils/uploadImage';
import FeedHeader from '@/components/feed/FeedHeader';
import { FeedCreateType, FeedImageType } from '@/core/types/feed';
import useForm from '@/hooks/useForm';
import { FEED_STATUS } from '@/core/enum/feed';
import FeedService from '@/services/feed';
import Button from '@/components/common/Button';

export interface FeedFileType {
  sortOrder: number;
  image: string;
  file: unknown;
}

function CreateFeed() {
  const router = useRouter();
  const [imageList, setImageList] = useState<FeedFileType[]>([]);
  const orderIndex = useRef<number>(0);

  const { formData: feedCreate, onChange } = useForm<FeedCreateType>({
    userId: 1,
    description: '',
    feedImages: imageList,
    status: FEED_STATUS.ACTIVE,
  });

  const { mutateAsync } = useMutation((formData: FeedCreateType) =>
    FeedService.createFeed(formData),
  );
  console.log(imageList);
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
      let imageUrlLists: FeedImageType[] = [];
      for (let i = 0; i < imageList.length; i++) {
        const currentImageUrl: unknown = await uploadFile(
          imageList[i].file,
          'feed',
        );
        const result: FeedImageType = {
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
    } catch (error: any) {
      console.log('error?.response', error?.response);
    }
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
  };

  const onClickRemoveImageHandler = (index: number) => {
    setImageList((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="feed-create">
      <div className="feed-create-form inner__container">
        <FeedHeader title="새 게시물" />

        <div className="feed-create-form-input">
          <div className="feed-create-form-input__label">
            <label
              htmlFor="file"
              className="button button-size--sm button-bg--ghost button-text--english"
            >
              <AiOutlineCamera
                size={24}
                className="feed-create-form-input__button-icon"
              />
              사진첨부하기
            </label>
          </div>
          <input
            id="file"
            type="file"
            accept="image/*"
            multiple={true}
            className="feed-create-form-input__input"
            onInput={onClickUploadImageHandler}
          />
        </div>
        <div className="feed-create-form-image-upload">
          {imageList &&
            imageList.map((image, index) => (
              <div className="feed-create-form-image">
                <div className="feed-create-form-image__button--delete">
                  <button onClick={() => onClickRemoveImageHandler(index)}>
                    <TiDelete size={24} color="black" />
                  </button>
                </div>
                <div className="feed-create-form-image-upload__image">
                  <Image
                    src={image.image}
                    key={image.sortOrder}
                    width={100}
                    height={100}
                    alt="image"
                  />
                </div>
              </div>
            ))}
        </div>
        <form
          className="feed-create-form-content"
          onSubmit={(event) => onSubmitForm(event, feedCreate)}
        >
          <textarea
            className="feed-create-form__textarea"
            name="description"
            placeholder="내용을 입력해주세요."
            value={feedCreate.description}
            onChange={onChange}
          />
          <Button
            size="md"
            variant="primary"
            type="submit"
            isEnglish
            isFull
            className="feed-create-form-complete__button"
          >
            완료
          </Button>
        </form>
      </div>
    </div>
  );
}
export default CreateFeed;
