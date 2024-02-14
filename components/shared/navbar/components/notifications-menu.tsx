import { IoNotifications } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { ShowIcon } from '@/components/show-icon';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function NotificationMenu() {
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <ShowIcon>
              <IoNotifications size={21} />
            </ShowIcon>
          </MenubarTrigger>
          <MenubarContent
            className="sm:min-w-96 sm:mx-0 p-0 min-w-64 mx-4"
            align="end"
          >
            <div className="bg-primary-1 px-3 py-2 flex-between text-white gap-1">
              <h1 className="text-lg font-semibold ">Notifications</h1>
              <Button variant="ghost" className="text-slate-300 px-2 py-0">
                Mark all as read
              </Button>
            </div>

            <div className="my-3 px-3 py-4">
              <span className="text-slate-400 italic block text-center">
                You don&apos;t have any notifications
              </span>
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
