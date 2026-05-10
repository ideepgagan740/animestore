import { AuthPage } from '@modules/auth';
import { MainLayout } from '@layouts/MainLayout';

export default function LoginPage() {
  return (
    <MainLayout>
      <AuthPage />
    </MainLayout>
  );
}
