import { useRouter } from 'next/router';
import { ImSpinner6 } from 'react-icons/im';
import { useState } from 'react';
import classNames from 'classnames';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CommentItem from '@/components/comment/CommentItem';
import CommentInput from '@/components/comment/CommentInput';
import { CommentType } from '@/core/types/comment/index';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import CommentService from '@/services/comment';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { ORDER_BY } from '@/core';
import { commentModifyState, commentState } from '@/store/commentAtom';
import CommentInputModal from '@/components/comment/CommentInputModal';

export default function CommentPage() {
  const router = useRouter();
  const [orderBy, setOrderBy] = useState(ORDER_BY.ASC);
  const setModifyComment = useSetRecoilState(commentState);
  const [isModifyModalOpen, setModifyModdalOpen] =
    useRecoilState(commentModifyState);

  const {
    data: comments,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll<CommentType>(
    ['comments', router.query.id as string, orderBy],
    (page) =>
      CommentService.getComments(parseInt(router.query.id as string), {
        page,
        limit: 10,
        orderBy,
      }),
  );

  const onClickCloseModifyCommentModalHandler = () => {
    setModifyModdalOpen(false);
    setModifyComment(null);
  };

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>댓글</TopHeader.Title>
        <TopHeader.Right>공유</TopHeader.Right>
      </TopHeader>
      <div className="comment__contatiner">
        <div className="comment__list">
          <div className="comment__filter">
            <button
              className={classNames('comment__filter__option', {
                'comment__filter__option--active': orderBy === ORDER_BY.ASC,
              })}
              onClick={() => setOrderBy(ORDER_BY.ASC)}
            >
              오래된 순
            </button>
            <button
              className={classNames('comment__filter__option', {
                'comment__filter__option--active': orderBy === ORDER_BY.DESC,
              })}
              onClick={() => setOrderBy(ORDER_BY.DESC)}
            >
              최신 순
            </button>
          </div>
          {comments &&
            comments.pages?.map((page, index) => (
              <div key={index}>
                {page.items.map((comment) => (
                  <CommentItem key={comment.id} item={comment} />
                ))}
              </div>
            ))}
          {bottom && <div ref={bottom} />}
          <div className="spinner_container">
            {status === 'success' && isFetchingNextPage ? (
              <ImSpinner6 className="spinner" />
            ) : null}
          </div>
        </div>
        <CommentInput />
        {isModifyModalOpen && (
          <CommentInputModal
            isOpen={isModifyModalOpen}
            onClose={onClickCloseModifyCommentModalHandler}
          >
            <CommentInput />
          </CommentInputModal>
        )}
      </div>
    </>
  );
}
