'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useMedia } from 'use-media';
import { usePathname } from 'next/navigation';

import { ProfileLinks,  } from '@/constants';

interface Props {
  isExternalUser?: boolean | string;
}

export function UserProfileLinksBar({ isExternalUser = false }: Props) {
  const isMobile = useMedia({ maxWidth: '640px' });
  const pathname = usePathname();

  // const links = isExternalUser && ProfileLinks;

  const isExternalProfile = isExternalUser
    ? `u/${isExternalUser}`
    : 'profile';

  return (
    <div className="flex laptop:gap-3 laptop:justify-start justify-between">
      {ProfileLinks.map((link, i) => (
        <Link
          key={i}
          prefetch
          href={`/${isExternalProfile}${link.path}`}
          className={clsx(
            'xs:px-4 px-3 py-2 hover:bg-slate-200 transition rounded-t-md duration-75 text-base hover:border-b-4 hover:border-primary1-hover',
            pathname === `/profile${link.path}` ||
              pathname === `/u/${isExternalUser}${link.path}` ||
              (link.path === '/' &&
                (pathname === '/profile' ||
                  pathname === `/u/${isExternalUser}`))
              ? 'border-b-4 border-primary-1'
              : 'border-b-4 border-transparent'
          )}
        >
          {isMobile ? (
            <link.icon color="rgb(100 116 139)" size={20} />
          ) : (
            link.label
          )}
        </Link>
      ))}
    </div>
  );
}
