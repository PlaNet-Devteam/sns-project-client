import { api } from '@/core/base.service';
import { FeedCreateType, FeedListType } from '@/core/types/feed';

const FeedService = {
  getFeeds: async (listData: FeedListType) => {
    const { data } = await api.get('/feed', {
      params: {
        ...listData,
      },
    });

    return data.data;
  },
  findAllByUser: async (username: string | string[] | undefined) => {
    const { data } = await api.get(`/feed/${username}`);
    return data.data;
  },
  createFeed: async (formData: FeedCreateType) => {
    const { data } = await api.post('/feed', formData);
    return data.data;
  },
};

export default FeedService;
