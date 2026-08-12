import Link from "next/link";
import type { Product } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all hover:border-blue-300 hover:shadow-md">
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 text-6xl">
          {product.emoji}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between">
            <Badge variant="blue">{product.categoryLabel}</Badge>
            <span className="text-xs text-gray-400">{product.condition}</span>
          </div>
          <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">
            {product.title}
          </h3>
          <div className="mt-auto pt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {product.sellerName} · Sem {product.sellerSemester}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
