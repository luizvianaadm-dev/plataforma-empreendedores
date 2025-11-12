'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50';
    
    const variants = {
      primary: 'bg-primary-950 text-white hover:bg-blue-800 border border-primary-950',
      secondary: 'bg-white text-primary-950 hover:bg-neutral-50 border border-neutral-200',
      danger: 'bg-error text-white hover:bg-red-600 border border-error',
      ghost: 'text-primary-950 hover:bg-neutral-100 border-transparent',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-lg',
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <span>Loading...</span> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
