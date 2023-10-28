import { USER_API, UserCreateType, UserUpdateType } from '@/core';
import { api } from '@/core/base.service';
import { UserUpdateStatusType } from '@/core/types/user/user-update-status.interface';

const UserService = {
  getFindMe: async () => {
    const { data } = await api.get(USER_API.FIND_ME);
    return data.data;
  },
  findUserByUsername: async (username: string) => {
    const { data } = await api.get(`/user/username/${username}`);
    return data.data;
  },
  createUser: async (formData: UserCreateType) => {
    const { data } = await api.post(USER_API.USER, formData);
    return data.data;
  },
  updateUser: async (id: number, formData: UserUpdateType) => {
    const { data } = await api.patch(`/user/${id}`, formData);
    return data.data;
  },
  updateUserStatus: async (formData: UserUpdateStatusType) => {
    const { data } = await api.patch(USER_API.UPDATE_STATUS, formData);
    return data.data;
  },
  findAllUserData: async () => {
    const { data } = await api.get('/user/users');
    return data;
  },
};

export default UserService;
