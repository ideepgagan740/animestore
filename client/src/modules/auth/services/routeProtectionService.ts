import type { AuthUser } from '@modules/auth';

export function canAccessRole(user: AuthUser | null, requiredRole?: string) {
  if (!requiredRole) return true;
  return user?.role === requiredRole;
}
