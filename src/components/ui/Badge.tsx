import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "blue" | "gray" | "green" | "amber" | "red";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  gray: "bg-gray-100 text-gray-700 ring-gray-500/20",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
};

export function Badge({ variant = "gray", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
