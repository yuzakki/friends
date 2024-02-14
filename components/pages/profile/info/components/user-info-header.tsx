import Link from 'next/link';

export function UserInfoHeader() {
  return (
    <div className="flex justify-between items-start">
      <h2 className="text-slate-600 text-xl capitalize font-medium">info</h2>
      <button className="text-primary-1 underline-offset-4 hover:underline">
        <Link prefetch href="/profile/edit">
          Edit
        </Link>
      </button>
    </div>
  );
}
