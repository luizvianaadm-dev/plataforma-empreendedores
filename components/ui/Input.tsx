'use client';

import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'outlined',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-medium transition-all duration-200 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      outlined: error
        ? 'border-error bg-white text-gray-900 placeholder-gray-500 focus:border-error focus:ring-2 focus:ring-error/20'
        : 'border-neutral-200 bg-white text-gray-900 placeholder-gray-500 hover:border-neutral-300 focus:border-primary-950 focus:ring-2 focus:ring-primary-950/20',
      filled: error
        ? 'border-b-2 border-error bg-error/5 text-gray-900 placeholder-gray-500 focus:border-b-error focus:ring-0'
        : 'border-b-2 border-neutral-200 bg-neutral-50 text-gray-900 placeholder-gray-500 hover:border-neutral-300 focus:border-primary-950 focus:ring-0',
    };

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
          {...props}
        />
        {(error || helperText) && (
          <span className={`text-xs font-medium ${
            error ? 'text-error' : 'text-gray-500'
          }`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
