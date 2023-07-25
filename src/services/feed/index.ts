import { api } from '@/core/base.service';

const FeedService = {
  findAllByUser: async (username: string | string[] | undefined) => {
    const { data } = await api.get(`/feed/${username}`);
    return data.data;
  },
};

export default FeedService;
