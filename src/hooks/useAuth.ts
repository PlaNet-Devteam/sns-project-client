import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import JwtStorageService, {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '@/core/utils/jwt-storage';
import { UserPayloadType } from '@/core';
import { userState } from '@/store/userAtom';

const useAuth = () => {
  const accessToken = JwtStorageService.getToken(ACCESS_TOKEN);
  const resetUser = useSetRecoilState(userState);
  let decodePayload: UserPayloadType | null = null;

  if (accessToken) {
    decodePayload = jwtDecode(accessToken);
  }

  const onLogout = () => {
    JwtStorageService.removeToken(ACCESS_TOKEN);
    JwtStorageService.removeToken(REFRESH_TOKEN);
    resetUser(null);
    location.replace('/login');
  };

  return {
    payload: decodePayload,
    onLogout,
  };
};

export default useAuth;
