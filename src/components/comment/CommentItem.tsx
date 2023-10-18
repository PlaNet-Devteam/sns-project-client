import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { formattedDate } from '@/utils/formattedDate';
import CommentService from '@/services/comment';
import useAuth from '@/hooks/useAuth';
import {
  commentIdState,
  commentModifyState,
  commentState,
} from '@/store/commentAtom';
import {
  commentReplyModalState,
  commentReplyState,
  replyToUserCommentState,
  replyToUsernameState,
} from '@/store/commentReplyAtom';
import { CommentType } from '../../core/types/comment/index';
import Dialog from '../dialog/Dialog';
import CommentReplyList from './CommentReplyList';
import CommentReplyInput from './CommentReplyInput';
import CommentInputModal from './CommentInputModal';

export interface CommentPropsType {
  item: CommentType;
}

const CommentItem = ({ item }: CommentPropsType) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { payload } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplyListOpen, setIsReplyListOpen] = useState(false);
  const setModifyModalOpen = useSetRecoilState(commentModifyState);
  const setModifyComment = useSetRecoilState(commentState);
  //  코멘트 답글 (REPLY)
  const setCommentId = useSetRecoilState(commentIdState);
  const setReplyToUsername = useSetRecoilState(replyToUsernameState);
  const setModifyReply = useSetRecoilState(commentReplyState);
  const [isReplyModalOpen, setIsReplyModalOpen] = useRecoilState(
    commentReplyModalState,
  );
  const setIsReplyToUserComment = useSetRecoilState(replyToUserCommentState);

  const handleModalOpen = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const deleteCommentItemMutation = useMutation({
    mutationKey: ['delete-comment', item.id],
    mutationFn: (item: CommentType) =>
      CommentService.deleteComment(item.feedId, item.id),
    onSuccess: () => {
      setIsModalOpen(false);
      return queryClient.invalidateQueries(['comments', router.query.id]);
    },
  });

  const handleDeleteCommentItem = async (item: CommentType) => {
    deleteCommentItemMutation.mutate(item);
  };

  const handleModifyCommentItem = async (item: CommentType) => {
    setIsModalOpen(false);
    setModifyModalOpen(true);
    setModifyComment(item);
  };

  const onClickViewReplyHandler = () => {
    setIsReplyListOpen((prevState) => !prevState);
  };

  const onClickAddReplyHandler = (item: CommentType) => {
    setIsReplyModalOpen(true);
    setCommentId(item.id);
    setReplyToUsername(item.user.username);
    setIsReplyListOpen(true);
  };

  const onCloseReplyModalHandler = () => {
    setIsReplyModalOpen(false);
    setReplyToUsername('');
    setCommentId(0);
    setModifyReply(null);
    setIsReplyToUserComment(false);
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
              <span className="comment__username">@{item.user?.username}</span>
              <span className="comment__time">
                {formattedDate()(item.updatedAt || item.createdAt)}{' '}
                {item.updatedAt && <>(편집됨)</>}
              </span>
            </div>
            <div className="comment__content">{item.comment}</div>
            <div className="comment__like-reply">
              <button
                className="comment__add-reply"
                onClick={() => onClickAddReplyHandler(item)}
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
        {item.replyCount > 0 && (
          <div className="comment__view">
            <button
              className="comment__view-reply"
              onClick={onClickViewReplyHandler}
            >
              답글 보기 ({item.replyCount})
            </button>

            {isReplyListOpen && <CommentReplyList commentId={item.id} />}
          </div>
        )}
      </div>
      <Dialog isOpen={isModalOpen}>
        <Dialog.Dimmed onClick={handleModalOpen} />
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="white"
            onClick={() => handleModifyCommentItem(item)}
          >
            수정
          </Dialog.LabelButton>
        )}
        {item.user.username === payload?.username && (
          <Dialog.LabelButton
            color="danger"
            onClick={() => handleDeleteCommentItem(item)}
          >
            삭제
          </Dialog.LabelButton>
        )}
        {item.user.username !== payload?.username && (
          <Dialog.LabelButton color="danger">신고</Dialog.LabelButton>
        )}
      </Dialog>
      {isReplyModalOpen && (
        <CommentInputModal
          isOpen={isReplyModalOpen}
          onClose={onCloseReplyModalHandler}
        >
          <CommentReplyInput />
        </CommentInputModal>
      )}
    </>
  );
};

export default CommentItem;
