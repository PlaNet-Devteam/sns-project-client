import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { commentState } from '../../store/commentAtom';
import sample from '../../../public/image/sample.png';

const Input = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const commentInput = useRef<HTMLInputElement>(null);
  const comments = useRecoilValue<Array<object>>(commentState);
  const setComments = useSetRecoilState(commentState);

  const addItem = (event: any) => {
    if (event.keyCode === 13) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          userId: 1,
          feedId: 1,
          comment: inputValue,
          likeCount: 0,
          replyCount: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ] as any);

      setInputValue('');
      console.log(comments);
    }
  };

  const onChangetHandler = () => {
    if (typeof commentInput.current?.value === 'string') {
      setInputValue(commentInput.current?.value);
    }
  };

  return (
    <>
      <div className="comment__input">
        <Image
          className="comment__profile-image"
          width={40}
          height={40}
          src={sample}
          alt="profile"
        ></Image>
        <input
          ref={commentInput}
          value={inputValue}
          onKeyDown={addItem}
          onChange={onChangetHandler}
          placeholder="댓글 추가"
        />
      </div>
    </>
  );
};

export default Input;
