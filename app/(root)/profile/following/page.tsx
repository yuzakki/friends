import { getUserFollowers, getUserFollowing } from '@/actions/follows';
import { currentUser } from '@/actions/auth/current-user';
import { IFollows } from '@/models/followsModel';

import { FollowersUsersCard } from '@/components/cards/followers-card';

export default async function FollowingPage() {
  const { user: loggedInUser } = await currentUser();
  const following = await getUserFollowing(loggedInUser?._id);

  return (
    <main>
      {following && following?.length > 0 && (
        <>
          <h1 className="mb-4 font-bold text-lg">
            People you are following {following.length}
          </h1>

          <div className="flex flex-col gap-4">
            {following?.map((follower: IFollows, index: number) => (
              <FollowersUsersCard
                key={index}
                follower={follower.followeeId}
                loggedInUser={loggedInUser}
              />
            ))}
          </div>
        </>
      )}

      {(!following || following.length === 0) && (
        <div className="my-10 flex justify-center items-center">
          <span className="text-slate-400 italic">
            You are not following anyone.
          </span>
        </div>
      )}
    </main>
  );
}
