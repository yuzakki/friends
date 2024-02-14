'use server';

import { connectToDb } from '@/lib/db';
import { IUser, UserModel } from '@/models/userModel';
import { currentUser } from '@/actions/auth/current-user';

export async function getUserByUsername(username: string) {
  connectToDb();

  const user = await UserModel.findOne({ username });

  if (!user) {
    return { error: 'There is no user with provided username' };
  }

  const plainObject: IUser | null = JSON.parse(JSON.stringify(user));

  return { user: plainObject };
}

export async function getUsers() {
  connectToDb();

  let query = {};

  const { user: me } = await currentUser();

  let userIdToExclude = me?._id;

  if (userIdToExclude) {
    query = { _id: { $ne: userIdToExclude } };
  }

  const users: IUser[] | null = await UserModel.find(query);

  const plainObject: IUser[] | null = JSON.parse(JSON.stringify(users));

  return { users: plainObject };
}
