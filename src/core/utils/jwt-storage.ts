import { Cookies } from 'react-cookie';

export const cookies = new Cookies();

export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';

const JwtStorageService = () => {
  const getToken = (name: string) => cookies.get(name);

  const setToken = (name: string, value: string) => {
    cookies.set(name, value, { path: '/' });
  };

  const removeToken = (name: string) => {
    cookies.remove(name, { path: '/' });
  };

  return {
    getToken,
    setToken,
    removeToken,
  };
};

export default JwtStorageService();
