import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUserAdd } from 'react-icons/ai';

import { cn } from '@/lib/utils';
import { getUserByUsername } from '@/actions/users';

import { CheckIsAuth } from '@/data/check-is-auth';
import {
  checkFollowRelationship,
  followUser,
  unfollowUser,
} from '@/actions/follows';
import { FollowButtons } from '../section-2/user-profile-info/follow-buttons';

export async function FollowMeSection({
  classes = false,
}: {
  classes?: string | boolean;
}) {
  const { user } = await getUserByUsername('hassan');

  const { user: loggedInUser, isAuthenticated } = await CheckIsAuth();
  let isUserFollowed = await checkFollowRelationship(user?._id);

  async function handleFollow() {
    'use server';
    await followUser({
      followerId: loggedInUser?._id,
      followeeId: user?._id,
    });
  }

  async function handleUnFollow() {
    'use server';
    await unfollowUser({
      followerId: loggedInUser?._id,
      followeeId: user?._id,
    });
  }

  return (
    <form
      action={isUserFollowed ? handleUnFollow : handleFollow}
      className={cn(
        !classes &&
          'bg-white !w-[23%] px-4 py-4 shadow-md rounded-lg hidden laptop:block h-fit',
        classes
      )}
    >
      <h1 className="mb-2.5 font-normal">Follow the dev.</h1>

      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center mlg:gap-3 gap-1">
          <Image
            className="rounded-full h-11 w-11 object-cover"
            src={user?.photo! || ''}
            alt="profile image"
            width={200}
            height={200}
            quality={100}
            priority
          />

          <Link
            href={`/u/${user?.username}`}
            className="font-medium text-primary-1"
          >
            @{user?.username}
          </Link>
        </div>

        <FollowButtons
          isDisabled={!isAuthenticated}
          isFollowed={isUserFollowed}
          btnClasses="rounded-full flex items-center gap-1"
          btnSize="sm"
          iconSize={17}
        />
      </div>
    </form>
  );
}
