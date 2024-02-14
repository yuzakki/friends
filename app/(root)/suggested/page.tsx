import { Metadata } from 'next';

import { getUsers } from '@/actions/users';
import { cn } from '@/lib/utils';

import { opensans, roboto } from '@/components/fonts';
import { UserBlock } from '@/components/pages/suggested/components/user-block';

export const metadata: Metadata = {
  title: 'Suggested People',
};

export default async function SuggestedPage() {
  const { users } = await getUsers();

  return (
    <main className="bg-light-1 main-container flex-1 py-4">
      <div className={cn('space-y-0.5 mt-2', roboto.className)}>
        <h1 className="text-2xl font-bold">Suggested People</h1>
        <p className="text-[15px] font-medium text-gray-400 tracking-tight">
          Follow people to see their updates
        </p>
      </div>

      <div className="mt-7">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {users?.map((user, i) => (
            <UserBlock key={i} user={user} />
          ))}
        </div>
      </div>
    </main>
  );
}
