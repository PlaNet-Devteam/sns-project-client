import { api } from '@/core/base.service';
import {
  CommentCreateType,
  CommentListType,
  CommentUpdateType,
} from '@/core/types/comment';

const CommentService = {
  getComments: async (feedId: number, listData?: CommentListType) => {
    const { data } = await api.get(`/feed/${feedId}/comment`, {
      params: {
        ...listData,
      },
    });

    return data.data;
  },
  createComment: async (feedId: number, formData: CommentCreateType) => {
    const { data } = await api.post(`/feed/${feedId}/comment`, formData);
    return data.data;
  },
  updateComment: async (commentId: number, formData: CommentUpdateType) => {
    const { data } = await api.patch(`/comment/${commentId}`, formData);
    return data.data;
  },
  deleteComment: async (feedId: number, commentId: number) => {
    const { data } = await api.delete(`/feed/${feedId}/comment/${commentId}`);
    return data;
  },
};

export default CommentService;
