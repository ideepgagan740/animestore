'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@shared/ui/atoms/Button';
import { Input } from '@shared/ui/atoms/Input';
import { useLogin } from '@modules/auth/hooks/useLogin';
import { loginSchema, type LoginFormValues } from '@modules/auth/validators/auth.validators';

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit((values) => login.mutate(values))}>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" autoComplete="email" {...register('email')} />
        {errors.email ? <p className="mt-1 text-sm text-destructive">{errors.email.message}</p> : null}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input id="password" type="password" autoComplete="current-password" {...register('password')} />
        {errors.password ? <p className="mt-1 text-sm text-destructive">{errors.password.message}</p> : null}
      </div>
      {login.error ? <p className="text-sm text-destructive">{login.error.message}</p> : null}
      <Button className="w-full" type="submit" disabled={login.isPending}>
        {login.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
