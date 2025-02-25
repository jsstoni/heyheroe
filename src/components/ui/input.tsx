import { cn } from '@/lib/utils';
import * as React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type InputError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | string
  | undefined;

interface InputProps extends React.ComponentProps<'input'> {
  error?: InputError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error && 'message' in error
          ? (error.message as string)
          : null;

    return (
      <div>
        <input
          className={cn(
            'h-10 w-full rounded-md border px-3 py-1.5',
            errorMessage && 'border-red-500',
            className
          )}
          ref={ref}
          type={type}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
