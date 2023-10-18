import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { formattedDate } from '@/utils/formattedDate';
import useAuth from '@/hooks/useAuth';
import { CommentReplyType } from '@/core/types/comment-reply';
import {
  commentReplyModalState,
  commentReplyState,
  replyToUserCommentState,
  replyToUsernameState,
} from '@/store/commentReplyAtom';
import CommentReplyService from '@/services/comment-reply';
import { commentIdState } from '@/store/commentAtom';
import Dialog from '../dialog/Dialog';

export interface CommentPropsType {
  item: CommentReplyType;
}

const CommentReplyItem = ({ item }: CommentPropsType) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { payload } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setIsReplyModdalOpen = useSetRecoilState(commentReplyModalState);
  const setModifyReply = useSetRecoilState(commentReplyState);
  const setReplyToUsername = useSetRecoilState(replyToUsernameState);
  const setCommentId = useSetRecoilState(commentIdState);
  const setIsReplyToUserComment = useSetRecoilState(replyToUserCommentState);

  const handleModalOpen = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const deleteCommentReplyItemMutation = useMutation({
    mutationKey: ['delete-reply', item.id],
    mutationFn: (item: CommentReplyType) =>
      CommentReplyService.deleteReply(item.commentId, item.id),
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries(['comments', router.query.id]);
      queryClient.invalidateQueries(['replies', item.commentId]);
    },
  });

  const handleDeleteCommentReplyItem = async (item: CommentReplyType) => {
    deleteCommentReplyItemMutation.mutate(item);
  };

  const handleModifyCommentReplyItem = async (item: CommentReplyType) => {
    setIsModalOpen(false);
    setIsReplyModdalOpen(true);
    setModifyReply(item);
  };

  const onClickReplyUsernameHandler = (item: CommentReplyType) => {
    setCommentId(item.commentId);
    setIsReplyToUserComment(true);
    setReplyToUsername(item.user.username);
    setIsReplyModdalOpen(true);
  };

  return (
    <>
      <div className="comment">
        <div className="comment__wrapper">
          <Link
            href={`/${item.user.username}`}
            className="comment__profile-image"
          >
            {item.user?.profileImage ? (
              <Image
                width={100}
                height={100}
                src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${item.user?.profileImage}`}
                alt="profile"
              ></Image>
            ) : (
              <Image
                src={'/img/icons/icon_default_profile.svg'}
                width={100}
                height={100}
                alt="프로필 이미지"
              />
            )}
          </Link>
          <div className="comment__info">
            <div className="comment__info-top">
              <span className="comment__username">
                <button onClick={() => onClickReplyUsernameHandler(item)}>
                  @{item.user?.username}
                </button>
              </span>
              <span className="comment__time">
                {formattedDate()(item.updatedAt || item.createdAt)}{' '}
                {item.updatedAt && <>(편집됨)</>}
              </span>
            </div>
            <div className="comment__content">{item.comment}</div>
            <div className="comment__like-reply">
              <button
                onClick={() => onClickReplyUsernameHandler(item)}
                className="comment__add-reply"
              >
                답글 달기
              </button>
            </div>
          </div>
          <div></div>
          <div className="comment__options">
            <BsThreeDotsVertical onClick={handleModalOpen} />
          </div>
        </div>
      </div>
      <Dialog isOpen={isModalOpen}>
        <Dialog.Dimmed onClick={handleModalOpen} />
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="white"
            onClick={() => handleModifyCommentReplyItem(item)}
          >
            수정
          </Dialog.LabelButton>
        )}
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="danger"
            onClick={() => handleDeleteCommentReplyItem(item)}
          >
            삭제
          </Dialog.LabelButton>
        )}
        {item.user.username !== payload?.username && (
          <Dialog.LabelButton color="danger">신고</Dialog.LabelButton>
        )}
      </Dialog>
    </>
  );
};

export default CommentReplyItem;
