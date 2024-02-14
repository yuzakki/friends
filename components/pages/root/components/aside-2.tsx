import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

import { getUsers } from '@/actions/users';
import { IUser } from '@/models/userModel';
import { CheckIsAuth } from '@/data/check-is-auth';
import {
  checkFollowRelationship,
  followUser,
  unfollowUser,
} from '@/actions/follows';

import { ShowIcon } from '@/components/show-icon';
import { FollowButtons } from '../../profile/components/section-2/user-profile-info/follow-buttons';

export async function AsideTwo() {
  const { users } = await getUsers();

  const shuffledUsers = users?.sort(() => Math.random() - 0.5);

  const suggestedUsers = shuffledUsers?.slice(0, 5);

  return (
    <>
      <div className="flex-between px-4 pb-3 pt-2">
        <h1 className="font-medium text-base capitalize">Suggested people</h1>
        <Link href="/suggested" className="text-primary-1 text-sm" prefetch>
          see all
        </Link>
      </div>

      {suggestedUsers?.map((user, i) => (
        <ShowUser key={i} user={user} i={i} />
      ))}
    </>
  );
}

export async function ShowUser({ user, i }: { user: IUser; i?: number }) {
  let showBorder;
  if (i) {
    showBorder = i !== 0;
  }

  const { user: loggedInUser } = await CheckIsAuth();
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
    <div
      className={clsx(
        'flex justify-between items-center gap-2 px-4 py-2',
        showBorder && 'border-t border-border'
      )}
    >
      <div className="flex items-center mlg:gap-3 gap-1">
        {user?.photo ? (
          <Image
            className="rounded-full h-11 w-11 object-cover"
            src={user?.photo}
            blurDataURL={user?.photo}
            placeholder="blur"
            alt="profile image"
            width={200}
            height={200}
            quality={100}
            priority
          />
        ) : (
          <ShowIcon>
            <FaUser size={21} />
          </ShowIcon>
        )}

        <div className="flex items-start justify-around flex-col">
          <div className="xl:block hidden">
            {user?.fullName && (
              <Link href={`u/${user?.username}`} className="font-normal font-sm">
                {user?.fullName}
              </Link>
            )}
          </div>

          <Link
            href={`/u/${user?.username}`}
            className="font-medium text-[15px] text-primary-1"
          >
            @{user?.username}
          </Link>
        </div>
      </div>

      {/* <Button
        size="sm"
        className="rounded-full bg-primary-1/80 flex items-center gap-1"
      >
        <AiOutlineUserAdd size={17} />
        Follow
      </Button> */}
      <form
        className="space-x-2"
        action={isUserFollowed ? handleUnFollow : handleFollow}
      >
        <FollowButtons isFollowed={isUserFollowed} btnSize="sm" iconSize={17} />
      </form>
    </div>
  );
}
