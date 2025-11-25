import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'small' | 'large';
  loading?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'default',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-md transition-all duration-base ease-out inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-card-hover disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 hover:-translate-y-0.5 hover:shadow-card disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:-translate-y-0.5 disabled:border-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed',
  };

  const sizes = {
    small: 'h-12 px-4 text-sm',
    default: 'h-14 px-6 text-base',
    large: 'h-16 px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};
