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
  const baseStyles = 'font-semibold rounded-md transition-all duration-normal ease-cyber inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 
      'bg-gradient-cyber-primary text-white shadow-cyber-md ' +
      'hover:-translate-y-0.5 hover:shadow-glow-primary ' +
      'active:translate-y-0 active:shadow-cyber-md ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-cyber-md',
    secondary: 
      'bg-cyber-blue-50 text-cyber-blue-700 border border-cyber-blue-200 shadow-cyber-sm ' +
      'hover:bg-cyber-blue-100 hover:border-cyber-blue-300 hover:-translate-y-0.5 hover:shadow-cyber-md ' +
      'active:translate-y-0 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    outline: 
      'border-2 border-cyber-blue-500 text-cyber-blue-600 bg-transparent ' +
      'hover:bg-cyber-blue-50 hover:-translate-y-0.5 hover:shadow-cyber-sm ' +
      'active:translate-y-0 ' +
      'disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:hover:bg-transparent',
  };

  const sizes = {
    small: 'h-10 px-4 text-sm',
    default: 'h-12 px-6 text-base',
    large: 'h-14 px-8 text-lg',
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
