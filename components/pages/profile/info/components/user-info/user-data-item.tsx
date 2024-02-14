import { cn } from '@/lib/utils';

interface UserDataItemProps {
  label: string;
  value?: any;
  index?: boolean;
}

export function UserDataItem({
  label,
  value,
  index = true,
}: UserDataItemProps) {
  return (
    <div
      className={cn(
        'flex items-start xm:items-center xm:justify-start flex-col xm:flex-row gap-1 xm:gap-20 pb-2 xm:pb-7 pt-4',
        index && 'border-slate-100 border-t'
      )}
    >
      <span className="font-medium text-sm laptop:text-base xm:w-32 xm:basis-[35%] basis-0">
        {label}
      </span>
      <span
        className={cn(
          'laptop:text-base text-sm @xm:text-black text-gray-500',
          value === 'Not set' && '!text-slate-400'
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function UserDataBioItem({ value }: { value: string }) {
  return (
    <div
      className={cn(
        'flex items-start flex-col gap-2 pb-2 xm:pb-7 pt-4 laptop:hidden',
        true && 'border-slate-100 border-t'
      )}
    >
      <span className="font-medium text-sm xm:w-32 xm:basis-[35%] basis-0">
        Bio
      </span>
      <span className="max-w-full text-sm text-gray-500">{value}</span>
    </div>
  );
}
