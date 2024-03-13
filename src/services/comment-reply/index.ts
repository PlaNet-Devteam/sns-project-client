import { api } from '@/core/base.service';
import {
  CommentCreateType,
  CommentListType,
  CommentUpdateType,
} from '@/core/types/comment';

const CommentReplyService = {
  getReplies: async (commentId: number, listData?: CommentListType) => {
    const { data } = await api.get(`/comment/${commentId}/reply`, {
      params: {
        ...listData,
      },
    });

    return data.data;
  },
  createReply: async (commentId: number, formData: CommentCreateType) => {
    const { data } = await api.post(`/comment/${commentId}/reply`, formData);
    return data.data;
  },
  updateReply: async (commentId: number, formData: CommentUpdateType) => {
    const { data } = await api.patch(`/reply/${commentId}`, formData);
    return data.data;
  },
  deleteReply: async (commentId: number, replyId: number) => {
    const { data } = await api.delete(`/comment/${commentId}/reply/${replyId}`);
    return data;
  },
};

export default CommentReplyService;
