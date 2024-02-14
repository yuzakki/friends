import { getUserFollowers } from '@/actions/follows';
import { currentUser } from '@/actions/auth/current-user';
import { IFollows } from '@/models/followsModel';

import { FollowersUsersCard } from '@/components/cards/followers-card';

export default async function FollowersPage() {
  const { user: loggedInUser } = await currentUser();
  const followers = await getUserFollowers(loggedInUser?._id);

  return (
    <main>
      {followers && followers?.length > 0 && (
        <>
          <h1 className="mb-4 font-bold text-lg">
            Your Followers {followers.length}
          </h1>
          <div className="flex flex-col gap-4">
            {followers?.map((follower: IFollows, index: number) => (
              <FollowersUsersCard
                key={index}
                follower={follower.followerId}
                loggedInUser={loggedInUser}
              />
            ))}
          </div>
        </>
      )}

      {(!followers || followers.length === 0) && (
        <div className="my-10 flex justify-center items-center">
          <span className="text-slate-400 italic">You have no followers.</span>
        </div>
      )}
    </main>
  );
}
