import { api } from '@/core/base.service';
import {
  FeedCreateType,
  FeedListType,
  FeedType,
  FeedUpdateStatusType,
} from '@/core/types/feed';
import { FeedUpdateType } from '@/core/types/feed/feed-update.interface';

const FeedService = {
  getFeeds: async (listData?: FeedListType) => {
    const { data } = await api.get('/feed', {
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
  getFeedsByTags: async (listData?: FeedListType) => {
    const { data } = await api.get('/feed/tag', {
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
  getFeed: async (feedId: number): Promise<FeedType> => {
    const { data } = await api.get(`/feed/${feedId}`);
    return data.data;
  },
  getFeedByUser: async (feedId: number): Promise<FeedType> => {
    const { data } = await api.get(`/user/feed/${feedId}`);
    return data.data;
  },
  createFeed: async (formData: FeedCreateType) => {
    const { data } = await api.post('/feed', formData);
    return data.data;
  },
  updateFeed: async (feedId: number, formData: FeedUpdateType) => {
    const { data } = await api.patch(`/feed/${feedId}`, formData);
    return data.data;
  },
  updateFeedStatus: async (feedId: number, formData: FeedUpdateStatusType) => {
    const { data } = await api.patch(`/feed/${feedId}/status`, formData);
    return data.data;
  },
  updateShowLikeCount: async (
    feedId: number,
    formData: FeedUpdateStatusType,
  ) => {
    const { data } = await api.patch(
      `/feed/${feedId}/show-like-count`,
      formData,
    );
    return data.data;
  },
  deleteFeed: async (feedId: number) => {
    const { data } = await api.delete(`/feed/${feedId}`);
    return data;
  },
  deleteFeedImage: async (feedId: number, sortOrder: number) => {
    const { data } = await api.delete(`/feed/${feedId}/image/${sortOrder}`);
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
