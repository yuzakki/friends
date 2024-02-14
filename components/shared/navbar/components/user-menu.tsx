'use client';

import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { LuUser2 } from 'react-icons/lu';
import { FiSettings } from 'react-icons/fi';

import { logout } from '@/actions/auth/logout';
import { IUser } from '@/models/userModel';

import { ShowIcon } from '@/components/show-icon';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { TbSettings } from 'react-icons/tb';

interface Props {
  user: IUser | null | undefined;
}

export function UserMenu({ user }: Props) {
  function handleLogout() {
    logout();
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            {user?.photo ? (
              <Image
                className="rounded-full h-11 w-11 object-cover"
                src={user?.photo}
                blurDataURL={user?.photo}
                placeholder="blur"
                alt="profile image"
                width={200}
                height={200}
                quality={100}
                priority
              />
            ) : (
              <ShowIcon>
                <FaUser size={21} />
              </ShowIcon>
            )}
          </MenubarTrigger>

          <MenubarContent align="end">
            <div className="px-2 py-1.5 text-sm font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.fullName || user?.username}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>

            <MenubarSeparator />

            <Link href="/profile" prefetch>
              <MenubarItem>
                <LuUser2 size={19} />
                Profile
              </MenubarItem>
            </Link>

            <Link href="/profile/info" prefetch>
              <MenubarItem>
                <FiSettings size={19} />
                Settings
              </MenubarItem>
            </Link>

            <MenubarSeparator />

            <MenubarItem onClick={handleLogout}>
              <MdLogout size={19} />
              Log Out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
