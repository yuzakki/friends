import { IUser } from '@/models/userModel';
import { CheckIsAuth } from '@/data/check-is-auth';
import {
  checkFollowRelationship,
  followUser,
  unfollowUser,
} from '@/actions/follows';

import { EditButton } from './edit-button';
import { FollowButtons } from './follow-buttons';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { TbDeviceDesktopShare } from 'react-icons/tb';
import Link from 'next/link';

interface Props {
  user: IUser | null | undefined;
  isExternalUser?: boolean;
}

export async function UserProfileInfo({ user, isExternalUser = false }: Props) {
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
    <div className="flex justify-between items-center flex-col laptop:flex-row laptop:gap-0 gap-3 py-4 px-2 laptop:mx-0 mx-auto">
      <div className="flex gap-1 flex-col text-start">
        <div className="flex gap-4 items-center">
          {user?.fullName && (
            <h1 className="text-2xl font-bold laptop:text-start text-center">
              {user?.fullName}
            </h1>
          )}

          {user?.username === 'hassan' && (
            <div className="flex items-center gap-x-2">
              <Button size="sm" className="w-full" variant="outline" asChild>
                <Link href="https://github.com/yuzakki" target="_blank">
                  <FaGithub className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="sm" className="w-full" variant="outline">
                <Link href="https://hassanwebdev.vercel.app" target="_blank">
                  <TbDeviceDesktopShare className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        <span className="text-xl font-normal text-gray-500 laptop:text-start text-center">
          @{user?.username}
        </span>
      </div>
      {isExternalUser ? (
        <form
          className="space-x-2"
          action={isUserFollowed ? handleUnFollow : handleFollow}
        >
          <FollowButtons
            isFollowed={isUserFollowed}
            isDisabled={!isAuthenticated}
          />
        </form>
      ) : (
        <EditButton />
      )}
    </div>
  );
}
