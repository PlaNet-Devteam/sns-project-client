import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsXLg } from 'react-icons/bs';
import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { commentIdState } from '../../store/commentAtom';
import sample from '../../../public/image/sample.png';
import IsLike from '../../assets/icons/icon_isLike.svg';
import NoLike from '../../assets/icons/icon_noLike.svg';
import { CommentPropsType } from '../../core/types/comment/index';
import { commentState } from '../../store/commentAtom';

const Comment = ({ comment }: CommentPropsType) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const setCommentId = useSetRecoilState(commentIdState);
  const setComments = useSetRecoilState(commentState);
  const comments = useRecoilValue(commentState);
  const router = useRouter();
  const { feedId } = router.query;

  const toggleHandler = () => {
    setIsLike(!isLike);
  };

  const deleteCommentHandler = (event: any) => {
    setCommentId(event!.target.dataset?.id);
    console.log(event.target);
    console.log(event.target.dataset?.id);
    const filtedComments = comments.filter(
      (el: any) => el.id !== Number(event!.target?.dataset?.id),
    );
    setComments(filtedComments);
  };

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
          <div className="comment__content">{comment?.comment}</div>
          <div
            className="comment__add-reply"
            onClick={() => router.push(`/reply/${feedId}`)}
          >
            답글 달기
          </div>
          <div className="comment__like-reply">
            <div className="comment__like-count">
              좋아요 {comment.likeCount}개
            </div>
            <div className="comment__reply-count">
              답글 {comment?.replyCount}개 더보기
            </div>
          </div>
        </div>
        <div className="comment__delete">
          <BsXLg
            className="comment__delete-icon"
            color="white"
            data-id={comment.id}
            onClick={deleteCommentHandler}
          />
        </div>
        {isLike ? (
          <IsLike className="comment__isLike" onClick={toggleHandler} />
        ) : (
          <NoLike className="comment__isLike" onClick={toggleHandler} />
        )}
      </div>
    </>
  );
};

export default Comment;
