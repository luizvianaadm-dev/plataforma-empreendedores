'use client';

import React from 'react';

interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
    className,
    ...props
  }, ref) => {
    const sizeStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
    };

    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200"
          onClick={onClose}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={ref}
            className={`${sizeStyles[size]} w-full bg-white rounded-xl shadow-xl transform transition-all duration-300 animate-in zoom-in-95 fade-in ${className || ''}`}
            {...props}
          >
            {(title || description) && (
              <div className="border-b border-neutral-200 px-6 py-4">
                {title && (
                  <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {description}
                  </p>
                )}
              </div>
            )}
            <div className="px-6 py-4">
              {children}
            </div>
            {footer && (
              <div className="border-t border-neutral-200 px-6 py-4 flex justify-end gap-3">
                {footer}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
