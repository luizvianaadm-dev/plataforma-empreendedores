'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'elevated',
    padding = 'md',
    className,
    children,
    ...props
  }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-200 overflow-hidden';

    const variantStyles = {
      elevated: 'bg-white shadow-md hover:shadow-lg border border-transparent',
      outlined: 'bg-white border-2 border-neutral-200 hover:border-neutral-300',
      filled: 'bg-neutral-50 border-none hover:bg-neutral-100',
    };

    const paddingStyles = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
