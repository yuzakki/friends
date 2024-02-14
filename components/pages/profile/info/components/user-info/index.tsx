import { currentUser } from '@/actions/auth/current-user';
import { formattedDate } from '@/lib/helpers';

import { UserDataBioItem, UserDataItem } from './user-data-item';

export async function UserInfo() {
  const { user } = await currentUser();

  return (
    <section className="sm:mt-10 mt-5">
      <UserDataItem
        label="Full Name"
        value={user?.fullName || 'Not set'}
        index={false}
      />
      <UserDataItem label="Username" value={`@${user?.username}`} />
      <UserDataItem label="Email Address" value={user?.email || false} />
      <UserDataItem label="Gender" value={user?.gender} />
      <UserDataItem
        label="Birthday"
        value={formattedDate(user?.birthday) || 'Not set'}
      />

      {/* Just special one  */}
      <UserDataBioItem value={user?.bio || 'Not set'} />

      <UserDataItem
        label="Date Joined"
        value={formattedDate(user?.dateJoined!)}
      />
    </section>
  );
}
