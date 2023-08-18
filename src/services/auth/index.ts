import { AUTH_API, AuthLoginType } from '@/core';
import { api } from '@/core/base.service';

const AuthService = {
  login: async (formData: AuthLoginType) => {
    const { data } = await api.post(AUTH_API.LOGIN, formData);
    return data.data;
  },

  refreshToken: async () => {
    const { data } = await api.post(AUTH_API.REFRESH_TOKEN);
    return data;
  },
};

export default AuthService;
