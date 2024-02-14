'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

import { connectToDb } from '@/lib/db';
import { IUser, UserModel } from '@/models/userModel';

export async function currentUser() {
  connectToDb();

  const token = cookies().get('jwt')?.value;

  if (token) {
    try {
      // 1) Verify token
      const decoded: any = jwt.verify(
        token!,
        process.env.JWT_SECRET! as string
      );

      // 2) Check if user still exists
      const currentUser = await UserModel.findById(decoded.id);
      if (!currentUser) {
        return {
          error: 'The user belonging to this token does no longer exist.',
        };
      }

      const plainObject: IUser | null = JSON.parse(JSON.stringify(currentUser));

      // THERE IS A LOGGED IN USER
      return { user: plainObject };
    } catch (error: any) {
      if (error instanceof jwt.TokenExpiredError) {
        return { error: 'Your token has expired. Please log in again.' };
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return { error: 'Token verification failed, Please log in again!' };
      }
    }
  }

  return { error: 'You are not logged in! Please log in to get access' };
}
