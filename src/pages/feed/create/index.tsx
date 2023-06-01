import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/common/Button';
import FeedHeader from '@/components/feed/FeedHeader';
import Photo from '../../../assets/feed/Photo.svg';

function CreateFeed() {
  const [imageList, setImageList] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  console.log(count);

  const onClickUploadImageHandler = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const result = event?.target?.result as string;
      setImageList([...imageList, result]);
    };
  };

  const onClickRemoveImageHandler = (index: number) => {
    const result = JSON.parse(JSON.stringify(imageList));
    result.splice(index, 1);
    setImageList(result);

    if (imageList.length === 0) {
      setCount(0);
    } else if (count >= imageList.length) {
      setCount(imageList.length - 1);
    }

    if (count - 1 >= 0) {
      setCount((prev) => prev - 1);
    } else if (count < imageList.length) {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div className="feed-create">
      <div className="feed-create-form layout_padding">
        <FeedHeader
          title="새 게시물"
          next="다음"
          nextColor={true}
          nextLink="create/description"
        />
        <div className="feed-create-form-image">
          {imageList?.[0] ? (
            <>
              <div>
                <div>
                  <Button onClick={() => onClickRemoveImageHandler(count)}>
                    x
                  </Button>
                  <Image
                    key={count}
                    src={imageList[count]}
                    width={240}
                    height={240}
                    alt="image"
                  />
                </div>
                <Button
                  onClick={() => {
                    setCount((prev) => prev + 1);
                  }}
                >
                  클릭
                </Button>
              </div>
            </>
          ) : (
            <>
              <Photo />
              <span className="feed-create-form-image__image">
                이미지를 추가해주세요.
              </span>
            </>
          )}
        </div>
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
