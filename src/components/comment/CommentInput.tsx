import React, { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { userState } from '@/store/userAtom';
import useForm from '@/hooks/useForm';
import { CommentCreateType } from '@/core/types/comment';
import CommentService from '@/services/comment';

const CommentInput = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    formData: commentCreate,
    onChange,
    onReset,
  } = useForm<CommentCreateType>({
    comment: '',
  });

  const user = useRecoilValue(userState);

  const { mutateAsync } = useMutation({
    mutationFn: (formData: CommentCreateType) =>
      CommentService.createComment(
        parseInt(router.query.feedId as string),
        formData,
      ),
    onSuccess: () => {
      onReset();
      return queryClient.invalidateQueries([
        `feed-${router.query.feedId}-comments`,
      ]);
    },
  });

  const onSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    formData: CommentCreateType,
  ) => {
    event.preventDefault();
    await mutateAsync(formData);
  };

  return (
    <>
      <div className="comment__input">
        <Image
          className="comment__profile-image"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${user?.profileImage}`}
          alt="profile"
        ></Image>
        <form onSubmit={(event) => onSubmitForm(event, commentCreate)}>
          <input
            type="text"
            value={commentCreate.comment}
            name="comment"
            placeholder="댓글 작성"
            onChange={onChange}
          />
        </form>
      </div>
    </>
  );
};

export default CommentInput;
