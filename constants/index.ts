import { IconType } from 'react-icons';
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';
import { LuUser2, LuUsers2 } from 'react-icons/lu';
import { MdInfo } from 'react-icons/md';

export interface IAsideLinksOne {
  label: string;
  path: string;
  icon: IconType;
}

export const AsideLinksOne: IAsideLinksOne[] = [
  {
    label: 'Profile',
    path: '/profile',
    icon: LuUser2,
  },
  {
    label: 'Following',
    path: '/profile/following',
    icon: LuUsers2,
  },
  {
    label: 'Followers',
    path: '/profile/followers',
    icon: LuUsers2,
  },
];

export interface IProfileLinks extends IAsideLinksOne {}

export const ProfileLinks: IProfileLinks[] = [
  {
    label: 'Posts',
    path: '/',
    icon: HiPencilAlt,
  },

  {
    label: 'Info',
    path: '/info',
    icon: MdInfo,
  },
  {
    label: 'Followers',
    path: '/followers',
    icon: FaUsers,
  },
  {
    label: 'Following',
    path: '/following',
    icon: FaUserPlus,
  },
];
