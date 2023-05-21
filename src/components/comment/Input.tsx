import Image from 'next/image';
import React from 'react';
import sample from '../../../public/image/sample.png';

const Input: React.FC = () => {
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
        <input placeholder="댓글 추가" />
      </div>
    </>
  );
};

export default Input;
