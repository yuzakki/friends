import { IUser } from '@/models/userModel';

import { MessageButton } from './components/message-button';
import { NotificationMenu } from './components/notifications-menu';
import { UserMenu } from './components/user-menu';

interface Props {
  user: IUser | null | undefined;
}

export function Authenticated({ user }: Props) {
  return (
    <div className="flex items-center flex-row-reverse gap-2">
      <UserMenu user={user} />

      {/* later */}
      {/* <NotificationMenu /> */}
      {/* <MessageButton /> */}
    </div>
  );
}
