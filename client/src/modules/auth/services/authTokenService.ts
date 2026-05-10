import { authTokenStorage } from '@infrastructure/storage/authTokenStorage';

export const authTokenService = {
  getAccessToken: authTokenStorage.getAccessToken,
  setAccessToken: authTokenStorage.setAccessToken,
  clear: authTokenStorage.clear,
};
