import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600 disabled:bg-blue-300",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:outline-gray-400 disabled:bg-gray-100 disabled:text-gray-400",
  outline:
    "border border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-gray-400",
  ghost: "text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-300",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
