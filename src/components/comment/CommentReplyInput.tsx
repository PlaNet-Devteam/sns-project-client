import React, { FormEvent, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaPaperPlane } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { userState } from '@/store/userAtom';
import useForm from '@/hooks/useForm';
import { CommentCreateType } from '@/core/types/comment';
import CommentReplyService from '@/services/comment-reply';
import { commentIdState } from '@/store/commentAtom';
import {
  commentReplyModalState,
  commentReplyState,
  replyToUserCommentState,
  replyToUsernameState,
} from '@/store/commentReplyAtom';
import LoadingLayer from '../common/LoadingLayer';
import UserProfileImage from '../common/UserProfileImage';

const CommentReplyInput = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const commentInput = useRef<HTMLInputElement>(null);
  const [modifyReply, setModifyReply] = useRecoilState(commentReplyState);
  const commentId = useRecoilValue(commentIdState);
  const setIsReplyModalOpen = useSetRecoilState(commentReplyModalState);
  const replyToUsername = useRecoilValue(replyToUsernameState);
  const isReplyToUserComment = useRecoilValue(replyToUserCommentState);

  const {
    formData: commentCreate,
    onChange,
    onReset,
  } = useForm<CommentCreateType>({
    comment: '',
  });

  const user = useRecoilValue(userState);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (formData: CommentCreateType) => {
      if (modifyReply) {
        return CommentReplyService.updateReply(modifyReply.id, formData);
      } else {
        return CommentReplyService.createReply(commentId, formData);
      }
    },
    onSuccess: () => {
      onReset('comment');
      setModifyReply(null);
      setIsReplyModalOpen(false);
      queryClient.invalidateQueries(['replies', commentId]);
      queryClient.invalidateQueries(['comments', router.query.id]);
    },
  });

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: CommentCreateType,
  ) => {
    event.preventDefault();
    await mutateAsync(formData);
  };

  useEffect(() => {
    const element = commentInput.current;
    if (element) {
      if (replyToUsername) {
        element.value = isReplyToUserComment ? `@${replyToUsername} ` : '';
      }

      element.focus();
    }
  }, [isReplyToUserComment, replyToUsername]);

  useEffect(() => {
    const element = commentInput.current;
    if (element) {
      if (modifyReply) {
        element.value = modifyReply?.comment || '';
      }

      element.focus();
    }
  }, [modifyReply]);

  return (
    <>
      {!modifyReply && replyToUsername && (
        <div className="comment__reply-info">
          @{replyToUsername} 에게 답글 작성중...
        </div>
      )}
      <div className="comment__input">
        <div className="comment__profile-image">
          {user && (
            <UserProfileImage
              username={user.username}
              imagePath={user.profileImage}
            />
          )}
        </div>
        <form
          onSubmit={(event) => onSubmitForm(event, commentCreate)}
          className="comment__form"
        >
          <input
            ref={commentInput}
            value={commentCreate.comment}
            type="text"
            name="comment"
            placeholder="답글 작성"
            onChange={onChange}
          />
          <button type="submit">
            <FaPaperPlane color="white" />
          </button>
        </form>
      </div>
      {isLoading && <LoadingLayer />}
    </>
  );
};

export default CommentReplyInput;
