import { IUser } from '@/models/userModel';
import { formattedDate } from '@/lib/helpers';

import { UserProfileDetailItem } from './user-profile-details-item';

interface Props {
  user: IUser | null | undefined;
}

export async function UserProfileDetails({ user }: Props) {
  return (
    <div className="bg-white !w-[23%] px-4 py-4 shadow-md rounded-lg space-y-3.5 hidden laptop:block h-fit">
      <UserProfileDetailItem
        title="Bio"
        content={
          user?.bio || <span className="italic text-base">No bio set</span>
        }
        contentClasses="text-sm"
      />

      <UserProfileDetailItem
        title="Joined"
        content={formattedDate(user?.dateJoined!)!}
      />
    </div>
  );
}
