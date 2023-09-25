import React from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import CommentReplyService from '@/services/comment-reply';
import { CommentReplyType } from '@/core/types/comment-reply';
import { ORDER_BY } from '@/core';
import CommentReplyItem from './CommentReplyItem';

interface CommentReplyListProps {
  commentId: number;
}

const CommentReplyList = ({ commentId }: CommentReplyListProps) => {
  const {
    data: commentReplies,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll(['replies', commentId], (page) =>
    CommentReplyService.getReplies(commentId, {
      page,
      limit: 5,
      orderBy: ORDER_BY.ASC,
    }),
  );

  return (
    <>
      {commentReplies &&
        commentReplies.pages.map((page, index) => (
          <div key={index}>
            {page.items.map((comment: CommentReplyType) => (
              <CommentReplyItem item={comment} key={comment.id} />
            ))}
          </div>
        ))}
      <div ref={bottom} />
      <div className="spinner_container">
        {status === 'success' && !isFetchingNextPage === undefined ? (
          <ImSpinner6 className="spinner" />
        ) : null}
      </div>
    </>
  );
};

export default CommentReplyList;
