import { USER_API, UserCreateType, UserUpdateType } from '@/core';
import { api } from '@/core/base.service';

const UserService = () => {
  const getFindMe = async () => {
    const { data } = await api.get(USER_API.FIND_ME);
    return data.data;
  };

  const createUser = async (formData: UserCreateType) => {
    const { data } = await api.post(USER_API.USER, formData);
    return data.data;
  };

  const updateUser = async (id: number, formData: UserUpdateType) => {
    const { data } = await api.patch(`/user/${id}`, formData);
    return data.data;
  };

  return {
    getFindMe,
    createUser,
    updateUser,
  };
};

export default UserService();
