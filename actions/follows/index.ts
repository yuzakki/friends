'use server';

import { revalidatePath } from 'next/cache';

import { connectToDb } from '@/lib/db';
import { FollowModel, IFollows } from '@/models/followsModel';
import { currentUser } from '../auth/current-user';

interface FollowsProps {
  followerId: string;
  followeeId: string;
}

export async function followUser({ followeeId, followerId }: FollowsProps) {
  connectToDb();

  try {
    await FollowModel.create({ followerId, followeeId });

    revalidatePath('/');
    revalidatePath('/profile');
    revalidatePath('/profile/following');
    revalidatePath('/profile/followers');
  } catch (error) {
    console.error('Error following user:', error);
    return { error: 'Something went wrong!' };
  }
}

export async function unfollowUser({ followeeId, followerId }: FollowsProps) {
  connectToDb();

  try {
    await FollowModel.deleteOne({ followerId, followeeId });

    revalidatePath('/');
    revalidatePath('/profile');
    revalidatePath('/profile/followers');
    revalidatePath('/profile/following');
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return { error: 'Something went wrong!' };
  }
}

// #################################################################

export async function getUserFollowers(userId: string) {
  connectToDb();

  const followers = await FollowModel.find({
    followeeId: userId,
  }).populate('followerId');

  const plainObject: IFollows[] | null = JSON.parse(JSON.stringify(followers));

  return plainObject;
}

export async function getUserFollowing(userId: string) {
  connectToDb();

  const followingUsers = await FollowModel.find({
    followerId: userId,
  }).populate('followeeId');

  const plainObject: IFollows[] | null = JSON.parse(
    JSON.stringify(followingUsers)
  );

  return plainObject;
}

// #################################################################

export async function checkFollowRelationship(
  userIdX: string
): Promise<boolean> {
  const { user: loggedInUser } = await currentUser();

  if (!loggedInUser) {
    return false;
  }

  connectToDb();

  const follow = await FollowModel.findOne({
    followerId: loggedInUser,
    followeeId: userIdX,
  });

  return !!follow;
}
