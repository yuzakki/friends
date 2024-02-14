import { getUserFollowing } from '@/actions/follows';
import { currentUser } from '@/actions/auth/current-user';
import { IFollows } from '@/models/followsModel';

import { FollowersUsersCard } from '@/components/cards/followers-card';
import { getUserByUsername } from '@/actions/users';

interface Props {
  params: { username: string };
}

export default async function FollowingPage({ params }: Props) {
  const { user } = await getUserByUsername(params.username);
  const { user: loggedInUser } = await currentUser();
  const following = await getUserFollowing(user?._id);

  return (
    <main>
      {following && following?.length > 0 && (
        <>
          <h1 className="mb-4 font-bold text-lg">
            Following {following.length}
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
            {user?.username || user?.fullName} is not following anyone.
          </span>
        </div>
      )}
    </main>
  );
}
