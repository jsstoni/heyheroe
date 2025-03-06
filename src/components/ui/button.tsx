'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva('rounded-md bg-white px-4 py-2 text-black', {
  variants: {
    variant: {
      default:
        'border border-amber-500 bg-white text-amber-500 hover:bg-amber-500 hover:text-white',
      primary: 'bg-amber-500 text-white hover:bg-amber-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-700',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type, className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ className, variant }),
          'hover:cursor-pointer disabled:border-none disabled:bg-amber-100 disabled:text-white'
        )}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
