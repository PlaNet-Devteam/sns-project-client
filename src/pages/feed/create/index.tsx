import Image from 'next/image';
import { useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { uploadFile } from '@/utils/uploadImage';
import FeedHeader from '@/components/feed/FeedHeader';
import { feedImageState } from '@/store/feedState';
import { FeedImageType } from '@/core/types/feed';
import Photo from '../../../assets/feed/Photo.svg';

function CreateFeed() {
  const [imageList, setImageList] =
    useRecoilState<FeedImageType[]>(feedImageState);
  const [count, setCount] = useState(0);
  const orderIndex = useRef<number>(0);

  const onClickUploadImageHandler = async (event: any) => {
    const file = event.target.files?.[0];
    const imaegUrl: unknown = await uploadFile(file, 'feed');
    if (!file) return;

    console.log('imaegUrl', imaegUrl);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const result: FeedImageType = {
        sortOrder: orderIndex.current,
        image: imaegUrl as string,
      };
      setImageList((prev) => [...prev, result]);
      orderIndex.current++;
      console.log('imageList', imageList);
    };
    setCount(imageList?.length);
  };

  const onClickRemoveImageHandler = (index: number) => {
    const result = JSON.parse(JSON.stringify(imageList));
    result.splice(index, 1);
    setImageList(result);

    if (result.length === 0) {
      setCount(0);
    } else if (count === result.length) {
      setCount((prev) => prev - 1);
    }
  };

  const onClickLeftButtonHandler = () => {
    if (imageList.length === 0) {
      return;
    } else if (count - 1 >= 0) {
      setCount((prev) => prev - 1);
    }
  };

  const onClickRightButtonHandler = () => {
    if (count == imageList.length - 1) {
      return;
    } else if (count < imageList.length - 1) {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div className="feed-create">
      <div className="feed-create-form inner__container">
        <FeedHeader
          title="새 게시물"
          next="다음"
          nextColor={true}
          nextLink="create/description"
        />
        {imageList?.[0] ? (
          <div className="feed-create-form-image">
            <div className="feed-create-form-image__button">
              {count > 0 ? (
                <button onClick={onClickLeftButtonHandler}>
                  <AiOutlineLeft size={48} color="white" />
                </button>
              ) : null}
            </div>
            <div>
              <div className="feed-create-form-image-upload">
                <div className="feed-create-form-image__button--delete">
                  <button onClick={() => onClickRemoveImageHandler(count)}>
                    <TiDelete size={36} color="white" />
                  </button>
                </div>
                <Image
                  key={count}
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${imageList[count]?.image}`}
                  width={200}
                  height={200}
                  alt="image"
                />
              </div>
            </div>
            <div className="feed-create-form-image__button">
              {count < imageList?.length - 1 ? (
                <button onClick={onClickRightButtonHandler}>
                  <AiOutlineRight size={48} color="white" />
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="feed-create-form-image-blank">
            <Photo />
            <span className="feed-create-form-image-text">
              이미지를 추가해주세요.
            </span>
          </div>
        )}
        <div className="feed-create-form-input">
          <label
            htmlFor="file"
            className="feed-create-form-input__label button button button-size--md button-bg--primary button-size--fill button-text--english"
          >
            Add Your Photo
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            className="feed-create-form-input__input"
            onInput={onClickUploadImageHandler}
          />
        </div>
      </div>
    </div>
  );
}
export default CreateFeed;
