import React from 'react';

export interface ButtonProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  size = 'md',
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
}) => {
  const sizeClass = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  }[size ?? 'md']; // fallback 안전장치

  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
  }[variant ?? 'primary']; // fallback 안전장치

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClass} ${variantClass} ${className}
      `}
    >
      {label}
    </button>
  );
};
