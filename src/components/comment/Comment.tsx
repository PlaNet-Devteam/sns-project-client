import Image from 'next/image';
import React from 'react';
import sample from '../../../public/image/sample.png';

const Comment: React.FC = () => {
  return (
    <>
      <div className="comment">
        <Image
          className="comment__profile-image"
          width={40}
          height={40}
          src={sample}
          alt="profile"
        ></Image>
        <div className="comment__info">
          <div className="comment__user-name">유저1</div>
          <div className="comment__content">댓글입니다.</div>
          <div className="comment__add-reply">답글 달기</div>
          <div className="comment__like-reply">
            <div className="comment__like-count">좋아요 00개</div>
            <div className="comment__reply-count">답글 00개 더보기</div>
          </div>
        </div>
        <div className="comment__isLike">좋아요</div>
      </div>
    </>
  );
};

export default Comment;
