import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';

import { CheckIsAuth } from '@/data/check-is-auth';

import { opensans } from '@/components/fonts';
import { UserProfileHeader } from '@/components/pages/profile/components/section-1/user-profile-header';
import { UserProfileInfo } from '@/components/pages/profile/components/section-2/user-profile-info';
import { UserProfileLinksBar } from '@/components/pages/profile/components/section-2/user-profile-links-bar';
import { FollowMeSection } from '@/components/pages/profile/components/section-3/follow-me';
import { UserProfileDetails } from '@/components/pages/profile/components/section-3/user-profile-details';

export const metadata: Metadata = {
  title: 'Profile',
};

async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = await CheckIsAuth();

  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  return (
    <main className="bg-light-1 main-container flex-1 min-h-screen">
      <section>
        <UserProfileHeader user={user} />
      </section>

      <section className="flex flex-col gap-2 laptop:ml-72 laptop:mt-0 sm:mt-28 -mt-4">
        <UserProfileInfo user={user} />
        <UserProfileLinksBar />
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

export default ProfileLayout;
