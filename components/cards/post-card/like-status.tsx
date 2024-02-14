import { AiFillLike } from 'react-icons/ai';

interface Props {
  isLikedByCurrentUser: boolean;
  likedCount: number;
  userName: string;
}

export function LikeStatus({
  isLikedByCurrentUser,
  likedCount,
  userName,
}: Props) {
  return (
    <div className="mx-4">
      {isLikedByCurrentUser && likedCount === 1 && (
        <div className="flex gap-1 items-center w-fit hover:underline underline-offset-1 cursor-pointer">
          <span className="w-5 h-5 rounded-full text-primary-1 flex-center">
            <AiFillLike />
          </span>

          <span className="text-sm text-slate-400">{userName}</span>
        </div>
      )}

      {isLikedByCurrentUser && likedCount > 1 && (
        <div className="flex gap-1 items-center w-fit hover:underline underline-offset-1 cursor-pointer">
          <span className="w-5 h-5 rounded-full text-primary-1 flex-center">
            <AiFillLike />
          </span>

          <span className="text-sm text-slate-400">
            You and {likedCount - 1} others
          </span>
        </div>
      )}

      {!isLikedByCurrentUser && likedCount > 0 && (
        <div className="flex gap-1 items-center w-fit hover:underline underline-offset-1 cursor-pointer">
          <span className="w-5 h-5 rounded-full text-primary-1 flex-center">
            <AiFillLike />
          </span>

          <span className="text-sm text-slate-400">{likedCount}</span>
        </div>
      )}
    </div>
  );
}
