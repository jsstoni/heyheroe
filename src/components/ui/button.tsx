'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva('rounded-md bg-white px-4 py-2 text-black', {
  variants: {
    variant: {
      default:
        'border border-orange-600 bg-white text-orange-600 hover:bg-orange-600 hover:text-white',
      primary: 'bg-orange-600 text-white hover:bg-orange-700',
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
        className={cn(buttonVariants({ className, variant }))}
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
