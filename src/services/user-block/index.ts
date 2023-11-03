import { UserBlockCreateType, UserBlockListType } from '@/core';
import { api } from '@/core/base.service';

const UserBlockService = {
  getBlockUsers: async (listData?: UserBlockListType) => {
    const { data } = await api.get('/user-block', {
      params: {
        ...listData,
      },
    });
    return data.data;
  },
  createUserBlock: async (formData: UserBlockCreateType) => {
    const { data } = await api.post('/user-block', formData);
    return data.data;
  },
  deleteUserBlock: async (formData: UserBlockCreateType) => {
    const { data } = await api.delete('/user-block', {
      data: formData,
    });
    return data.data;
  },
};

export default UserBlockService;
