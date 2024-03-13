import { FOLLOW_API } from '@/core';
import { api } from '@/core/base.service';
import { FollowCreateType } from '@/core/types/follow';
import { FollowListType } from '@/core/types/follow/follow-list.interface';

const FollowService = {
  getAllUsers: async (
    username: string,
    path: string,
    listData?: FollowListType,
  ) => {
    const { data } = await api.get(`/user/${username}/${path}`, {
      params: {
        ...listData,
      },
    });

    return data.data;
  },
  createFollow: async (formData: FollowCreateType) => {
    const { data } = await api.post(FOLLOW_API.FOLLOW, formData);
    return data.data;
  },
  deleteFollow: async (formData: FollowCreateType) => {
    const { data } = await api.delete(FOLLOW_API.UNFOLLOW, { data: formData });
    return data;
  },
};

export default FollowService;
