import React, { FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
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
          {user?.profileImage ? (
            <Image
              width={100}
              height={100}
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${user?.profileImage}`}
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
