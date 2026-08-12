import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FilterTabItem {
  label: string;
  href: string;
  active: boolean;
}

export function FilterTabs({ items, className }: { items: FilterTabItem[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "h-10 rounded-lg border px-4 text-sm font-medium transition-colors inline-flex items-center",
            item.active
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50",
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
