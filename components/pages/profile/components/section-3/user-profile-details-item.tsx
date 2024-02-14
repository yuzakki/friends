import { cn } from '@/lib/utils';

interface UserProfileDetailItemProps {
  title: string;
  content: any;
  contentClasses?: string;
}
export function UserProfileDetailItem({
  title,
  content,
  contentClasses,
}: UserProfileDetailItemProps) {
  return (
    <div className="space-y-2.5">
      <h1 className="font-medium text-lg">{title}</h1>
      <span className={cn('text-slate-400 block', contentClasses)}>
        {content}
      </span>
    </div>
  );
}
