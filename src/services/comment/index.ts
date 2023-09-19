import { api } from '@/core/base.service';
import { CommentCreateType, CommentListType } from '@/core/types/comment';

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
};

export default CommentService;
