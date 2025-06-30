import classNames from "classnames";
import type { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  onClick: () => void;
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
};

export function Button({
  onClick,
  children,
  variant = "primary",
  className,
  size = "medium",
  disabled = false,
}: ButtonProps) {
  const baseClasses = [
    "border",
    "border-gray-300",
    "rounded-md",
    "shadow-sm",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-indigo-500",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "inline-flex",
    "items-center",
    "gap-2",
  ];

  const variantClasses = {
    primary: [
      ...baseClasses,
      "bg-indigo-600",
      "text-white",
      "hover:bg-indigo-700",
    ],
    secondary: [
      ...baseClasses,
      "bg-white",
      "text-gray-700",
      "hover:bg-gray-50",
    ],
    ghost: ["rounded-md", "hover:bg-gray-100"],
  };

  const sizeClasses = {
    small: ["p-1", "h-auto"],
    medium: ["px-4", "py-2", "h-auto"],
    large: ["px-6", "py-3", "h-auto"],
  };

  return (
    <button
      type="button"
      className={classNames(
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
