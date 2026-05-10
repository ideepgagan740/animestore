import { useMutation } from '@tanstack/react-query';
import { authApi } from '@modules/auth/api/authApi';
import { authTokenService } from '@modules/auth/services/authTokenService';
import { setUser } from '@modules/auth/store/authSlice';
import type { LoginCredentials } from '@modules/auth/types/auth.types';
import { useAppDispatch } from '@store/hooks';
import { showToast } from '@store/uiSlice';

export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (session) => {
      authTokenService.setAccessToken(session.accessToken);
      dispatch(setUser(session.user));
      dispatch(showToast({ message: `Welcome back, ${session.user.firstName}`, tone: 'success' }));
    },
  });
}
