import Image from 'next/image';
import React, { useState } from 'react';
import sample from '../../../public/image/sample.png';
import IsLike from '../../assets/icons/icon_isLike.svg';
import NoLike from '../../assets/icons/icon_noLike.svg';

const Reply: React.FC = () => {
  const [isLike, setIsLike] = useState<boolean>(false);

  const toggleHandler = () => {
    setIsLike(!isLike);
    console.log(isLike);
  };

  return (
    <>
      <div className="reply">
        <Image
          className="reply__profile-image"
          width={40}
          height={40}
          src={sample}
          alt="profile"
        ></Image>
        <div className="reply__info">
          <div className="reply__user-name">유저1</div>
          <div className="reply__content">답글입니다.</div>
          {/* <div className="comment__add-reply">답글 달기</div> */}
          <div className="reply__like-reply">
            <div className="replyt__like-count">좋아요 00개</div>
            {/* <div className="comment__reply-count">답글 00개 더보기</div> */}
          </div>
        </div>
        {isLike ? (
          <IsLike className="reply__isLike" onClick={toggleHandler} />
        ) : (
          <NoLike className="reply__isLike" onClick={toggleHandler} />
        )}
      </div>
    </>
  );
};

export default Reply;
