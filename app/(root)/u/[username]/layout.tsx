import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cn } from '@/lib/utils';

import { opensans } from '@/components/fonts';
import { getUserByUsername } from '@/actions/users';

import { UserProfileHeader } from '@/components/pages/profile/components/section-1/user-profile-header';
import { UserProfileInfo } from '@/components/pages/profile/components/section-2/user-profile-info';
import { UserProfileLinksBar } from '@/components/pages/profile/components/section-2/user-profile-links-bar';
import { FollowMeSection } from '@/components/pages/profile/components/section-3/follow-me';
import { UserProfileDetails } from '@/components/pages/profile/components/section-3/user-profile-details';
import { CheckIsAuth } from '@/data/check-is-auth';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;
  const { user } = await getUserByUsername(username);

  return {
    title: user?.username || user?.fullName,
  };
}

interface UsernameLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}

async function UsernameLayout({ children, params }: UsernameLayoutProps) {
  const { user: loggedInUser, isAuthenticated } = await CheckIsAuth();
  if (isAuthenticated && loggedInUser?.username === params.username) {
    return redirect('/profile');
  }

  const { user } = await getUserByUsername(String(params.username));

  if (!user) {
    return (
      <div className="flex flex-col items-center mt-20 w-full text-center">
        <p className="text-red-500 text-2xl font-semibold mb-4">User does not exist!</p>
      </div>
    );
  }

  return (
    <main className="bg-light-1 main-container flex-1 min-h-screen">
      <section>
        <UserProfileHeader user={user} isExternalUser />
      </section>

      <section className="flex flex-col gap-2 laptop:ml-72 laptop:mt-0 sm:mt-28 -mt-4">
        <UserProfileInfo user={user} isExternalUser />
        <UserProfileLinksBar isExternalUser={params.username} />
      </section>

      <section className="flex justify-between gap-4 mt-7">
        <UserProfileDetails user={user} />
        <div className={cn('grow sm:mb-20 mb-36', opensans.className)}>
          {children}
        </div>
        <FollowMeSection />
      </section>
    </main>
  );
}

export default UsernameLayout;
