import Image from 'next/image';
import { useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineCamera } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { uploadFile } from '@/utils/uploadImage';
import FeedHeader from '@/components/feed/FeedHeader';
import { FeedImageType } from '@/core/types/feed';
import useForm from '@/hooks/useForm';
import FeedService from '@/services/feed';
import Button from '@/components/common/Button';
import useMouseDrag from '@/hooks/useMouseDrag';
import { feedState } from '@/store/feedAtom';
import { FeedModifyType } from '@/core/types/feed/feed-modify.interface';

function ModifyFeed() {
  const router = useRouter();
  const feedItem = useRecoilValue(feedState);
  const [imageList, setImageList] = useState<FeedImageType[]>(
    feedItem?.feedImages || [],
  );
  const orderIndex = useRef<number>(0);
  const scrollRef = useRef<any>(null);
  const { isDrag, onDragStart, onDragEnd, onThrottleDragMove } =
    useMouseDrag(scrollRef);
  const { formData: feedModify, onChange } = useForm<FeedModifyType>({
    description: feedItem?.description || '',
    feedImages: imageList,
  });

  const { mutateAsync } = useMutation((formData: FeedModifyType) =>
    FeedService.modifyFeed(feedItem?.id || 0, formData),
  );

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: FeedModifyType,
  ) => {
    event.preventDefault();

    if (imageList?.length === 0) {
      alert('사진을 첨부해주세요.');
      return;
    }

    try {
      let list: FeedImageType[] = [];
      for (let i = 0; i < imageList.length; i++) {
        const result: FeedImageType = {
          feedId: feedItem?.id,
          sortOrder: orderIndex.current++,
          image: imageList[i].image,
        };
        list = [...list, result];
      }
      console.log(list);
      await mutateAsync({
        ...formData,
        feedImages: list,
      });
      router.push('/feed');
      setImageList([]);
    } catch (error: any) {
      console.log('error?.response', error?.response);
    }

    console.log('imageList', imageList);
  };

  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageLists = event.target.files || [];

    let imageUrlLists = [...imageList];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = await uploadFile(imageLists[i], 'feed');
      const result: FeedImageType = {
        feedId: feedItem?.id,
        sortOrder: 0,
        image: currentImageUrl as string,
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
        <div
          className="feed-create-form-image-upload"
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onMouseMove={isDrag ? onThrottleDragMove : undefined}
          ref={(e) => (scrollRef.current = e)}
        >
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
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${image.image}`}
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
          onSubmit={(event) => onSubmitForm(event, feedModify)}
        >
          <textarea
            className="feed-create-form__textarea"
            name="description"
            placeholder="내용을 입력해주세요."
            value={feedModify.description}
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
export default ModifyFeed;
