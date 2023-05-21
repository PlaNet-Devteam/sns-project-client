import Image from 'next/image';
import React from 'react';
// import sample from '../../../public/image/sample.png';
import sample from '../../../public/image/sample.png';
const Comment: React.FC = () => {
  return (
    <>
      <div className="container">
        <Image
          className="profile-image"
          width={40}
          height={40}
          src={sample}
          alt="profile"
        ></Image>
        <div className="comment-info">
          <div className="user-name">유저1</div>
          <div className="comment-content">댓글입니다.</div>
          <div className="add-count">답글 달기</div>
          <div className="like-reply">
            <div className="like-count">좋아요 00개</div>
            <div className="reply-count">답글 00개 더보기</div>
          </div>
        </div>
        <div className="isLike">좋아요</div>
      </div>
    </>
  );
};

export default Comment;
