'use client';

import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    status = 'info',
    size = 'md',
    children,
    className,
    ...props
  }, ref) => {
    const baseStyles = 'font-medium rounded-full inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200';

    const statusStyles = {
      success: 'bg-success/10 text-success border border-success/20',
      error: 'bg-error/10 text-error border border-error/20',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      info: 'bg-primary-950/10 text-primary-950 border border-primary-950/20',
    };

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${statusStyles[status]} ${sizeStyles[size]} ${className || ''}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
