import Link from 'next/link';
import { AsideLinksOne, IAsideLinksOne } from '@/constants';
import { ShowIcon } from '@/components/show-icon';

export function AsideOne() {
  return (
    <>
      {AsideLinksOne.map((link, i) => (
        <ShowLink key={i} link={link} />
      ))}
    </>
  );
}

function ShowLink({ link }: { link: IAsideLinksOne }) {
  return (
    <Link
      href={link.path}
      className="flex items-center gap-4 px-4 py-4 hover:bg-slate-100 transition cursor-pointer duration-100"
    >
      <ShowIcon
        hoverEffect={false}
        keepClasses={false}
        className="text-primary-1"
      >
        <link.icon size={28} />
      </ShowIcon>

      <h1 className="font-medium text-lg">{link.label}</h1>
    </Link>
  );
}
