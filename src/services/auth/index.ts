import { AUTH_API, AuthLoginType, ChangePasswordType } from '@/core';
import { api } from '@/core/base.service';

const AuthService = {
  login: async (formData: AuthLoginType) => {
    const { data } = await api.post(AUTH_API.LOGIN, formData);
    return data.data;
  },
  logout: async () => {
    const { data } = await api.post(AUTH_API.LOGOUT);
    return data.data;
  },
  refreshToken: async () => {
    const { data } = await api.post(AUTH_API.REFRESH_TOKEN);
    return data;
  },
  changePassword: async (formData: ChangePasswordType) => {
    const { data } = await api.patch(AUTH_API.CHANGE_PASSWORD, formData);
    return data.data;
  },
};

export default AuthService;
