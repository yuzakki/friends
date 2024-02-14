import { redirect } from 'next/navigation';

import { roboto } from '@/components/fonts';
import { CheckIsAuth } from '@/data/check-is-auth';

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = await CheckIsAuth();
  if (isAuthenticated) redirect('/');

  return (
    <section className={`${roboto.className} min-h-screen flex flex-col`}>
      <main className="flex-1">{children}</main>
    </section>
  );
}

export default AuthLayout;
