import { cn } from '@/lib/utils';
import * as React from 'react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type TextareaError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | string
  | undefined;

interface TextareaProps extends React.ComponentProps<'textarea'> {
  error?: TextareaError;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error && 'message' in error
          ? (error.message as string)
          : null;

    return (
      <>
        <textarea
          className={cn(
            'w-full rounded-md border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-25',
            errorMessage && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>
        )}
      </>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
