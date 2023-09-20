import { api } from '@/core/base.service';
import { FeedCreateType, FeedListType } from '@/core/types/feed';
import { FeedModifyType } from '@/core/types/feed/feed-modify.interface';

const FeedService = {
  getFeeds: async (listData?: FeedListType) => {
    const { data } = await api.get('/feed', {
      params: {
        ...listData,
      },
    });

    return data.data;
  },
  findAllByUser: async (
    username: string | string[] | undefined,
    listData?: FeedListType,
  ) => {
    const { data } = await api.get(`/feed/user/${username}`, {
      params: {
        ...listData,
      },
    });
    return data.data;
  },
  createFeed: async (formData: FeedCreateType) => {
    const { data } = await api.post('/feed', formData);
    return data.data;
  },
  modifyFeed: async (feedId: number, feedItem: FeedModifyType) => {
    const { data } = await api.patch(`/feed/${feedId}`, feedItem);
    return data;
  },
  deleteFeed: async (feedId: number) => {
    const { data } = await api.delete(`/feed/${feedId}`);
    return data;
  },
  likeFeed: async (feedId: number) => {
    const { data } = await api.post(`/feed/${feedId}/like`);
    return data;
  },
  delteLikeFeed: async (feedId: number) => {
    const { data } = await api.delete(`/feed/${feedId}/like`);
    return data;
  },
};

export default FeedService;
