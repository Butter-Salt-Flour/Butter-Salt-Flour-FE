import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'primary' | 'underline';
  className?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', className = '', ...props }, ref) => {
    let variantClass = '';

    switch (variant) {
      case 'primary':
        variantClass = 'border border-gray-300 px-4 py-2 rounded-md';
        break;
      case 'underline':
        variantClass = 'border-b border-gray-400 px-2 py-1 bg-transparent';
        break;
      default:
        variantClass = 'border px-2 py-1';
    }

    return (
      <input
        ref={ref}
        className={`${variantClass} focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }
);

InputField.displayName = 'Input';
