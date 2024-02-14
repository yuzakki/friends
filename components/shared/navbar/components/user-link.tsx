import clsx from 'clsx';
import Link from 'next/link';
import { opensans } from '@/components/fonts';

export function UserLink({ link }: { link: any }) {
  return (
    <Link
      key={link.label}
      href={`${link.path}`}
      className={clsx(
        'flex gap-2 items-center px-2 py-2 h-full hover:bg-slate-100 duration-200 rounded-sm',
        opensans.className
      )}
    >
      {<link.icon size={21} />}
      {link.label}
    </Link>
  );
}
