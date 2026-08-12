import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  href?: string;
}

export function StatCard({ title, value, icon, href }: StatCardProps) {
  const content = (
    <Card className="flex items-center gap-4 p-5 transition-all hover:border-blue-300 hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xl text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
