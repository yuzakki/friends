import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [textType, setTextType] = React.useState(type);

    return (
      <div className="relative flex items-center">
        <input
          type={textType}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute cursor-pointer right-2"
            onClick={() => {
              setTextType((prevType) =>
                prevType === 'password' ? 'text' : 'password'
              );
            }}
          >
            {textType === 'password' && <EyeOff size={20} color="#475569" />}
            {textType === 'text' && <Eye size={20} color="#475569" />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
