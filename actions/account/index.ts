'use server';

import { revalidatePath } from 'next/cache';
import { connectToDb } from '@/lib/db';
import { UserModel } from '@/models/userModel';
import { currentUser } from '@/actions/auth/current-user';

export async function updateMyAccount(data: any) {
  connectToDb();

  const { user } = await currentUser();
  if (!user) return;

  await UserModel.findOneAndUpdate({ _id: user?._id }, data, {
    upsert: true,
  });

  revalidatePath('/profile');
  revalidatePath('/profile/info');
  return { success: 'Your info have been updated!' };
}
