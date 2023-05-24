import { USER_API } from '@/core';
import { api } from '@/core/base.service';

const UserService = () => {
  const getFindMe = async () => {
    const { data } = await api.get(USER_API.FIND_ME);
    return data.data;
  };

  return {
    getFindMe,
  };
};

export default UserService();
