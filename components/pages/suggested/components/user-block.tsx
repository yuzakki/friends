import Link from 'next/link';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';

import { IUser } from '@/models/userModel';
import {
  checkFollowRelationship,
  followUser,
  unfollowUser,
} from '@/actions/follows';

import { FollowButtons } from '../../profile/components/section-2/user-profile-info/follow-buttons';
import { ShowIcon } from '@/components/show-icon';
import { CheckIsAuth } from '@/data/check-is-auth';

export async function UserBlock({ user }: { user: IUser | null }) {
  const { isAuthenticated, user: loggedInUser } = await CheckIsAuth();
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
    <div className="bg-white rounded-lg shadow-sm px-4 py-2.5 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        {user?.photo ? (
          <Link href={`/u/${user?.username}`} className="!w-11">
            <Image
              className="rounded-full h-11 w-11 object-cover"
              src={user?.photo}
              blurDataURL={user?.photo}
              placeholder="blur"
              alt="profile image"
              width={200}
              height={200}
              priority
            />
          </Link>
        ) : (
          <Link href={`/u/${user?.username}`}>
            <ShowIcon>
              <FaUser size={21} />
            </ShowIcon>
          </Link>
        )}

        <div className="flex items-start justify-around flex-col">
          <div className="xs:block hidden">
            {user?.fullName && (
              <Link href={`/u/${user?.username}`} className="font-normal">
                {user?.fullName}
              </Link>
            )}
          </div>

          <Link
            href={`/u/${user?.username}`}
            className="font-medium text-primary-1 xs:text-[15px] text-xs"
          >
            @{user?.username}
          </Link>
        </div>
      </div>

      <div>
        <form
          className="space-x-2"
          action={isUserFollowed ? handleUnFollow : handleFollow}
        >
          <FollowButtons
            isFollowed={isUserFollowed}
            isDisabled={!isAuthenticated}
          />
        </form>
      </div>
    </div>
  );
}
