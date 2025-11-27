import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  // Base styles: Pixel font, hard borders, uppercase
  "inline-flex items-center justify-center whitespace-nowrap text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 pixel-btn uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
        secondary: "bg-white text-neutral-900 hover:bg-neutral-100",
        outline: "border-2 border-black bg-transparent hover:bg-neutral-100 text-black",
        ghost: "border-transparent shadow-none hover:bg-neutral-100 hover:text-neutral-900",
        success: "bg-success-500 text-white hover:bg-success-600 border-black",
        danger: "bg-error text-white hover:bg-red-600",
      },
      size: {
        default: "h-12 px-6 py-2",
        small: "h-9 px-4 text-base",
        large: "h-14 px-8 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };