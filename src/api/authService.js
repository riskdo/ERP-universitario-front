import { apiUrls, request, useMocks } from './httpClient';
import { loginMock } from '../mocks/authMock';

export const authService = {
  async login(email, senha) {
    if (useMocks) {
      return loginMock(email, senha);
    }

    return request(apiUrls.core, '/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
  },
};
