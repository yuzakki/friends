import Logo from '@/components/logo';

import { DontHaveAcc } from '@/components/forms/auth/components/buttons';
import { FormLayout } from '@/components/forms/auth/components/form-layout';
import { LoginForm } from '@/components/forms/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-8 px-4 auth-page">
      <Logo textClasses="text-white font-bold" />

      <FormLayout title="Login">
        <LoginForm />
        <DontHaveAcc />
      </FormLayout>
    </main>
  );
}
