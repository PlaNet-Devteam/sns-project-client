import { TagListType } from '@/core';
import { api } from '@/core/base.service';

const TagService = {
  getTags: async (listData?: TagListType) => {
    const { data } = await api.get('/tag', {
      params: {
        ...listData,
      },
    });
    return data.data;
  },
};

export default TagService;
