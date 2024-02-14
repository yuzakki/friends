import * as React from 'react';
import clsx from 'clsx';

interface ShowIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  keepClasses?: boolean;
  hoverEffect?: boolean;
  className?: string;
}

export function ShowIcon({
  children,
  keepClasses = true,
  hoverEffect = true,
  className,
  ...props
}: ShowIconProps) {
  return (
    <div
      className={clsx(
        keepClasses &&
          'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 rounded-full active:scale-90 duration-300 h-11 w-11',
        hoverEffect && 'hover:bg-slate-300/90',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
