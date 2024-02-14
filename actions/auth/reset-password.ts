'use server';

import crypto from 'crypto';

import { UserModel } from '@/models/userModel';
import { signToken } from '@/lib/utils';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const JWT_COOKIE_EXPIRES_IN: number = Number(
  process.env.JWT_COOKIE_EXPIRES_IN!
);

interface Props {
  token: string;
  newPassword: string;
}

export async function resetPassword({ token, newPassword }: Props) {
  // 1) Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return { error: 'Token is invalid or has expired' };
  }

  // 3) Update passwordChangedAt property for the user
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) Log the user in, send JWT
  const newToken = signToken(user._id);

  let cookieOptions: ResponseCookie = {
    name: 'jwt',
    value: newToken,
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  cookies().set('jwt', newToken, cookieOptions);
  redirect('/');
}
