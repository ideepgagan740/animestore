import { apiClient } from '@services/api/apiClient';
import { apiRoutes } from '@config/apiRoutes';
import type { AuthSession, LoginCredentials, RegisterCredentials } from '@modules/auth/types/auth.types';

export const authApi = {
  register: (credentials: RegisterCredentials) =>
    apiClient.post<AuthSession, RegisterCredentials>(apiRoutes.auth.register, credentials),
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthSession, LoginCredentials>(apiRoutes.auth.login, credentials),
};
