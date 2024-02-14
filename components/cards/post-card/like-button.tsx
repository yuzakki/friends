'use client';

import { useFormStatus } from 'react-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { ReloadIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

export function LikeButton({ isLiked }: { isLiked: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="py-1.5 w-full px-4 text-gray-500 disabled:pointer-events-none disabled:opacity-50"
      type="submit"
      disabled={pending}
    >
      <div className="flex-center gap-1 w-full mx-auto">
        {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}

        {!pending && (
          <span className={cn(isLiked && 'text-primary-1')}>
            {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </span>
        )}

        <span className={cn('text-sm font-bold', isLiked && 'text-primary-1')}>
          Like
        </span>
      </div>
    </button>
  );
}
