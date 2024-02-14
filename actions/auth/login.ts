'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { redirect } from 'next/navigation';

import { connectToDb } from '@/lib/db';
import { LoginSchema } from '@/schemas';
import { UserModel } from '@/models/userModel';
import { signToken } from '@/lib/utils';

const JWT_COOKIE_EXPIRES_IN: number = Number(
  process.env.JWT_COOKIE_EXPIRES_IN!
);

export async function login({ email, password }: z.infer<typeof LoginSchema>) {
  connectToDb();

  // 1) Validate input
  if (!email || !password) {
    return { error: 'Please provide email and password' };
  }

  // 2) Creating a new user in the database
  const user = await UserModel.findOne({ email }).select('+password');

  // 3) Check if the user exists and validate password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return { error: 'Incorrect email or password' };
  }

  // 4) Send token to client
  const token = signToken(user._id);

  let cookieOptions: ResponseCookie = {
    name: 'jwt',
    value: token,
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  cookies().set('jwt', token, cookieOptions);

  revalidatePath('/');

  redirect('/');
}
