import type { Metadata } from 'next';

import Logo from '@/components/logo';
import { ResetPasswordForm } from '@/components/forms/auth/reset-password';
import {
  FormHeader,
  FormLayout,
} from '@/components/forms/auth/components/form-layout';

export const metadata: Metadata = {
  title: 'Reset Your Password',
};

interface Props {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: Props) {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen gap-8 px-4 auth-page">
        <Logo textClasses="text-white font-bold" />

        <FormLayout title="Reset Your Password">
          <FormHeader>Enter your new password below.</FormHeader>

          <ResetPasswordForm token={params.token} />
        </FormLayout>
      </div>
    </main>
  );
}
