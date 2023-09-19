import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CommentType } from '../../core/types/comment/index';

export interface CommentPropsType {
  item: CommentType;
}

const Comment = ({ item }: CommentPropsType) => {
  return (
    <>
      <div className="comment">
        <Link href={`/${item.user.username}`}>
          <Image
            className="comment__profile-image"
            width={60}
            height={60}
            quality={100}
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${item.user?.profileImage}`}
            alt="profile"
          ></Image>
        </Link>
        <div className="comment__info">
          <div className="comment__user-name">{item.user?.nickname}</div>
          <div className="comment__content">{item.comment}</div>
          <div className="comment__like-reply">
            <div className="comment__reply-count">
              답글 {item?.replyCount}개
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
