import React from 'react';
import CommentReplyService from '@/services/comment-reply';
import { ORDER_BY } from '@/core';
import InfinityDataList from '../common/InfinityDataList';
import CommentReplyItem from './CommentReplyItem';

interface CommentReplyListProps {
  commentId: number;
}

const CommentReplyList = ({ commentId }: CommentReplyListProps) => {
  return (
    <>
      <InfinityDataList
        queryKey={['replies', commentId]}
        listType={'button'}
        fetchData={(page) =>
          CommentReplyService.getReplies(commentId, {
            page,
            limit: 5,
            orderBy: ORDER_BY.ASC,
          })
        }
        renderToChildComponent={CommentReplyItem}
      ></InfinityDataList>
    </>
  );
};

export default CommentReplyList;
