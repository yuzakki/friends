import Logo from '@/components/logo';

import { AlreadyHaveAcc } from '@/components/forms/auth/components/buttons';
import { FormLayout } from '@/components/forms/auth/components/form-layout';
import { SignUpForm } from '@/components/forms/auth/signup-form';

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-8 px-4 auth-page">
      <Logo textClasses="text-white font-bold" />

      <FormLayout title="Sign Up">
        <SignUpForm />
        <AlreadyHaveAcc />
      </FormLayout>
    </main>
  );
}
