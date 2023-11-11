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
  getFeedsByTag: async (listData?: FeedListType) => {
    const { data } = await api.get('/feed/tag', {
      params: {
        ...listData,
      },
    });
    return data.data;
  },
  getFeedsByFollowing: async (listData?: FeedListType) => {
    const { data } = await api.get('/feed/following', {
      params: {
        ...listData,
      },
    });

    return data.data;
  },
  getFeedsByUser: async (
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
  getFeedsByBookmark: async (listData?: FeedListType) => {
    const { data } = await api.get('/feed/bookmark', {
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
  bookmarkFeed: async (feedId: number) => {
    const { data } = await api.post(`/feed/${feedId}/bookmark`);
    return data;
  },
  deleteBookmarkFeed: async (feedId: number) => {
    const { data } = await api.delete(`/feed/${feedId}/bookmark`);
    return data;
  },
};

export default FeedService;
