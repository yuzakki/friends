import { currentUser } from '@/actions/auth/current-user';
import { IUser } from '@/models/userModel';

export async function CheckIsAuth() {
  const { user } = await currentUser();

  let loggedInUser: IUser | null | undefined = user;

  let isAuthenticated = loggedInUser !== null && loggedInUser !== undefined;

  return { isAuthenticated, user: loggedInUser };
}
