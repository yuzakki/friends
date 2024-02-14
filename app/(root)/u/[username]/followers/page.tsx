import { getUserFollowers } from '@/actions/follows';
import { currentUser } from '@/actions/auth/current-user';
import { IFollows } from '@/models/followsModel';

import { FollowersUsersCard } from '@/components/cards/followers-card';
import { getUserByUsername } from '@/actions/users';
import { CheckIsAuth } from '@/data/check-is-auth';

interface Props {
  params: { username: string };
}

export default async function FollowersPage({ params }: Props) {
  const { user } = await getUserByUsername(params.username);
  const { user: loggedInUser, isAuthenticated } = await CheckIsAuth();
  const followers = await getUserFollowers(user?._id);

  return (
    <main>
      {followers && followers?.length > 0 && (
        <>
          <h1 className="mb-4 font-bold text-lg">
            Followers {followers.length}
          </h1>
          <div className="flex flex-col gap-4">
            {followers?.map((follower: IFollows, index: number) => (
              <FollowersUsersCard
                isAuth={isAuthenticated}
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
          <span className="text-slate-400 italic">
            {user?.username || user?.fullName} has no followers.
          </span>
        </div>
      )}
    </main>
  );
}
