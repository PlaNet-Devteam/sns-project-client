import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import JwtStorageService, {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '@/core/utils/jwt-storage';
import { UserPayloadType } from '@/core';
import { userState } from '@/store/userAtom';
import AuthService from '@/services/auth';

const useAuth = () => {
  const accessToken = JwtStorageService.getToken(ACCESS_TOKEN);
  const resetUser = useSetRecoilState(userState);
  let decodePayload: UserPayloadType | null = null;
  const [payload, setPayload] = useState<UserPayloadType | null>(decodePayload);
  if (accessToken) {
    decodePayload = jwtDecode(accessToken);
  }

  useEffect(() => {
    setPayload(decodePayload);
  }, []);

  const onLogout = async () => {
    const isLoggedOut = await AuthService.logout();
    if (isLoggedOut) {
      JwtStorageService.removeToken(ACCESS_TOKEN);
      JwtStorageService.removeToken(REFRESH_TOKEN);
      resetUser(null);
      location.replace('/login');
    }
  };

  return {
    payload: payload,
    onLogout,
  };
};

export default useAuth;
