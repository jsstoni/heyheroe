import { cn } from '@/lib/utils';
import * as React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type SelectError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | string
  | undefined;

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.ComponentProps<'select'> {
  options: SelectOption[];
  error?: SelectError;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, ...props }, ref) => {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error && 'message' in error
          ? (error.message as string)
          : null;

    return (
      <div>
        <select
          className={cn(
            'w-full appearance-none rounded-md border bg-white px-3 py-1.5',
            errorMessage && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
