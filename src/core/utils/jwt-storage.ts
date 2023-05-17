// TODO: 쿠키로 바꾸기
class JwtStorageService {
  TOKEN_NAME = 'accessToken';

  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(value: string) {
    localStorage.setItem(this.TOKEN_NAME, value);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}

export default new JwtStorageService();
