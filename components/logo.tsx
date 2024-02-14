import Link from 'next/link';
import { RiChatSmile3Fill } from 'react-icons/ri';
import { cn } from '@/lib/utils';

import { opensans } from './fonts';

interface LogoProps {
  textClasses?: string;
}

export default function Logo({ textClasses }: LogoProps) {
  return (
    <Link href="/">
      <div
        className={cn(
          'logo font-black text-2xl flex gap-1.5 items-center',
          opensans.className
        )}
      >
        <RiChatSmile3Fill color="#FFC436" size={40} />
        <h1 className={textClasses}>Friends</h1>
      </div>
    </Link>
  );
}
