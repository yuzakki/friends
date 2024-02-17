import Image from 'next/image';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

import {
  checkFollowRelationship,
  followUser,
  unfollowUser,
} from '@/actions/follows';
import { IUser } from '@/models/userModel';

import { FollowButtons } from '@/components/pages/profile/components/section-2/user-profile-info/follow-buttons';
import { ShowIcon } from '@/components/show-icon';

interface Props {
  follower: IUser;
  loggedInUser: IUser | null | undefined;
  isAuth?: boolean;
}

export async function FollowersUsersCard({
  follower,
  loggedInUser,
  isAuth,
}: Props) {
  let isUserFollowed = await checkFollowRelationship(follower?._id);

  async function handleFollow() {
    'use server';
    await followUser({
      followerId: loggedInUser?._id,
      followeeId: follower?._id,
    });
  }

  async function handleUnFollow() {
    'use server';
    await unfollowUser({
      followerId: loggedInUser?._id,
      followeeId: follower?._id,
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-md px-4 py-2.5 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        {follower?.photo ? (
          <Link href={`/u/${follower?.username}`}>
            <Image
              className="rounded-full h-11 w-11 object-cover"
              src={follower?.photo}
              blurDataURL={follower?.photo}
              placeholder="blur"
              alt="profile image"
              width={200}
              height={200}
              priority
            />
          </Link>
        ) : (
          <Link href={`/u/${follower?.username}`}>
            <ShowIcon>
              <FaUser size={21} />
            </ShowIcon>
          </Link>
        )}

        <div className="flex items-start justify-around flex-col">
          <div>
            {follower?.fullName && (
              <Link
                href={`/u/${follower?.username}`}
                className="font-normal text-sm"
              >
                {follower?.fullName}
              </Link>
            )}
          </div>

          <Link
            href={`/u/${follower?.username}`}
            className="font-medium text-[15px] text-primary-1"
          >
            @{follower?.username}
          </Link>
        </div>
      </div>

      <div>
        <form
          className="space-x-2"
          action={isUserFollowed ? handleUnFollow : handleFollow}
        >
          <FollowButtons isDisabled={isAuth} isFollowed={isUserFollowed} />
        </form>
      </div>
    </div>
  );
}
