import React, { FormEvent, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FaPaperPlane } from 'react-icons/fa';
import { userState } from '@/store/userAtom';
import useForm from '@/hooks/useForm';
import { CommentCreateType } from '@/core/types/comment';
import CommentService from '@/services/comment';
import { commentModifyState, commentState } from '@/store/commentAtom';
import LoadingLayer from '../common/LoadingLayer';
import UserProfileImage from '../common/UserProfileImage';

const CommentInput = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const commentInput = useRef<HTMLInputElement>(null);
  const [modifyComment, setModifyComemnt] = useRecoilState(commentState);
  const setModifyModdalOpen = useSetRecoilState(commentModifyState);

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
      if (modifyComment) {
        return CommentService.updateComment(modifyComment.id, formData);
      } else {
        return CommentService.createComment(
          parseInt(router.query.id as string),
          formData,
        );
      }
    },
    onSuccess: () => {
      onReset();
      if (modifyComment) {
        setModifyComemnt(null);
        setModifyModdalOpen(false);
      }
      return queryClient.invalidateQueries(['comments', router.query.id]);
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
      element.value = modifyComment?.comment || '';
      element.focus();
    }
  }, [modifyComment?.comment]);

  return (
    <>
      <div className="comment__input">
        <div className="comment__profile-image">
          <UserProfileImage imagePath={user?.profileImage} />
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
            placeholder="댓글 작성"
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

export default CommentInput;
