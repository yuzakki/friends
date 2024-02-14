import type { Metadata } from 'next';

import Logo from '@/components/logo';
import { ForgotPasswordForm } from '@/components/forms/auth/forgot-password';
import {
  FormHeader,
  FormLayout,
} from '@/components/forms/auth/components/form-layout';

export const metadata: Metadata = {
  title: 'Forgot Your Password?',
};

export default function ForgotPasswordPage() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen gap-8 px-4 auth-page">
        <Logo textClasses="text-white font-bold" />

        <FormLayout title="Forgot Your Password?">
          <FormHeader>
            Enter the email connected to your account and we will send an email
            with instructions how to reset your password.
          </FormHeader>

          <ForgotPasswordForm />
        </FormLayout>
      </div>
    </main>
  );
}
