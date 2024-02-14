import { IUser } from '@/models/userModel';

import { UserDataBioItem, UserDataItem } from './user-data-item';
import { formattedDate } from '@/lib/helpers';

interface Props {
  user: IUser | null | undefined;
}

export async function UserInfo({ user }: Props) {
  return (
    <section className="sm:mt-10 mt-5">
      <UserDataItem
        label="Full Name"
        value={user?.fullName || 'Not set'}
        index={false}
      />
      <UserDataItem label="Username" value={user?.username} />
      <UserDataItem label="Gender" value={user?.gender} />
      <UserDataItem
        label="Birthday"
        value={formattedDate(user?.birthday) || 'Not set'}
      />

      <UserDataBioItem value={user?.bio || 'Not set'} />

      <UserDataItem
        label="Date Joined"
        value={formattedDate(user?.dateJoined!)}
      />
    </section>
  );
}
