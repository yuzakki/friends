import Link from 'next/link';
import { LuPencilLine } from 'react-icons/lu';

export function EditButton() {
  return (
    <Link
      href="/profile/edit"
      prefetch
      className="border-2 border-slate-500 rounded-full cursor-pointer flex items-center justify-evenly laptop:justify-around gap-2 px-2 laptop:px-3 py-1 laptop:py-2 text-slate-500 hover:bg-slate-500/10 transition-colors"
    >
      <LuPencilLine size={20} />
      <span className="text-sm">Edit Profile</span>
    </Link>
  );
}
