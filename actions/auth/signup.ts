'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { redirect } from 'next/navigation';

import { connectToDb } from '@/lib/db';
import { SignUpSchema } from '@/schemas';
import { UserModel } from '@/models/userModel';
import { signToken } from '@/lib/utils';

const JWT_COOKIE_EXPIRES_IN: number = Number(
  process.env.JWT_COOKIE_EXPIRES_IN!
);

export async function signup({
  email,
  password,
  username,
}: z.infer<typeof SignUpSchema>) {
  connectToDb();

  // 1) Validate input
  if (!email || !password || !username)
    return { error: 'Please provide email and password' };

  // 2) Check if the email already exists in the database
  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) return { error: 'Email already exists' };

  if (username) {
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) return { error: 'Username already exists' };
  }

  // 3) Creating a new user in the database
  const newUser = await UserModel.create({
    email,
    password,
    username,
  });

  // 4) Send token to client
  const token = signToken(newUser._id);

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
