import * as React from 'react';
import clsx from 'clsx';
import { Input } from '@/components/ui/input';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        className={clsx('text-black bg-slate-50', className)}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);

InputField.displayName = 'InputField';
