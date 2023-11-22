import { useRouter } from 'next/router';
import { useState } from 'react';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CommentItem from '@/components/comment/CommentItem';
import CommentInput from '@/components/comment/CommentInput';
import { CommentType } from '@/core/types/comment/index';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import CommentService from '@/services/comment';
import { ORDER_BY } from '@/core';
import {
  commentIdState,
  commentModifyState,
  commentState,
} from '@/store/commentAtom';
import CommentInputModal from '@/components/comment/CommentInputModal';
import {
  commentReplyModalState,
  commentReplyState,
  replyToUserCommentState,
  replyToUsernameState,
} from '@/store/commentReplyAtom';
import CommentReplyInput from '@/components/comment/CommentReplyInput';
import InfinityDataList from '@/components/common/InfinityDataList';

export default function CommentPage() {
  const router = useRouter();
  const [orderBy, setOrderBy] = useState(ORDER_BY.ASC);
  const setModifyComment = useSetRecoilState(commentState);
  const [isModifyModalOpen, setModifyModdalOpen] =
    useRecoilState(commentModifyState);
  const isReplyModalOpen = useRecoilValue(commentReplyModalState);
  const setCommentId = useSetRecoilState(commentIdState);
  const setReplyToUsername = useSetRecoilState(replyToUsernameState);
  const setModifyReply = useSetRecoilState(commentReplyState);
  const setIsReplyModalOpen = useSetRecoilState(commentReplyModalState);
  const setIsReplyToUserComment = useSetRecoilState(replyToUserCommentState);

  const onClickCloseModifyCommentModalHandler = () => {
    setModifyModdalOpen(false);
    setModifyComment(null);
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
          <InfinityDataList
            queryKey={['comments', router.query.id as string, orderBy]}
            listType={'scroll'}
            fetchData={(page, limit) =>
              CommentService.getComments(parseInt(router.query.id as string), {
                page,
                limit,
                orderBy,
              })
            }
            renderToChildComponent={CommentItem}
          ></InfinityDataList>
        </div>
        <CommentInput />
      </div>
      {isModifyModalOpen && (
        <CommentInputModal
          isOpen={isModifyModalOpen}
          onClose={onClickCloseModifyCommentModalHandler}
        >
          <CommentInput />
        </CommentInputModal>
      )}
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
}
