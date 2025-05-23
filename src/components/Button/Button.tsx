"use client";

import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "yes" | "no";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  style,
  width,
  height,
}) => {
  const sizeClass = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
    lx: "px-5 py-3 text-3xl",
  }[size];

  const variantClass = {
    primary: "bg-yellow-400 text-white hover:bg-yellow-500",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    yes: "bg-[#FF9800] text-white hover:bg-[#FB8C00]", // 주황
    no: "bg-[#F4F5F7] text-[#5A5F67] hover:bg-[#E0E2E5]", // 연회색
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width,
        height,
        ...style,
      }}
      className={`
        rounded-lg font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClass} ${variantClass} ${className}
      `}
    >
      {children}
    </button>
  );
};
