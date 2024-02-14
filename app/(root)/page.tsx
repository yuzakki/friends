import { AsideOne } from '@/components/pages/root/components/aside-1';
import { AsideTwo } from '@/components/pages/root/components/aside-2';
import { MainSide } from '@/components/pages/root/components/main-side';
import { FollowMeSection } from '@/components/pages/profile/components/section-3/follow-me';
import { CheckIsAuth } from '@/data/check-is-auth';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { isAuthenticated } = await CheckIsAuth();

  return (
    <main className="pt-5 flex justify-between gap-4 items-start bg-light-1 main-container flex-1">
      <div className="w-1/4  hidden laptop:block space-y-4">
        {isAuthenticated && (
          <>
            <div className="w-full shadow-md bg-white rounded-lg ">
              <AsideOne />
            </div>

            <FollowMeSection classes="bg-white !w-full px-4 py-4 shadow-md rounded-lg h-fit" />
          </>
        )}
      </div>

      <div className="grow">
        {!isAuthenticated && (
          <h1 className="font-bold xm:text-2xl text-lg mt-1 mb-6 text-gray-600">
            Public posts that might interest you.
          </h1>
        )}

        <MainSide />
      </div>

      <div className="w-1/4 shadow-md hidden laptop:block rounded-lg overflow-hidden">
        {isAuthenticated && (
          <div className="py-2 bg-white">
            <AsideTwo />
          </div>
        )}
      </div>
    </main>
  );
}
