const ACCESS_TOKEN_KEY = 'anime_store_access_token';

export const authTokenStorage = {
  getAccessToken: () => {
    if (typeof window === 'undefined') return null;
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken: (token: string) => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  clear: () => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};