import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productService } from "@/services/productService";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatPrice } from "@/utils/format";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await productService.getProductById(id);
  return { title: product ? product.title : "Product not found" };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to products
      </Link>

      <Card className="overflow-hidden">
        <div className="flex h-64 items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 text-8xl">
          {product.emoji}
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue">{product.categoryLabel}</Badge>
            <Badge variant="gray">{product.condition}</Badge>
            {product.sold && <Badge variant="red">Sold</Badge>}
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
            {product.title}
          </h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <p className="mt-4 leading-7 text-gray-600">{product.description}</p>

          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs text-gray-500">Seller</p>
                <p className="mt-0.5 font-medium text-gray-900">
                  {product.sellerName} · Semester {product.sellerSemester}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Listed</p>
                <p className="mt-0.5 font-medium text-gray-900">
                  {formatDate(product.listedAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button size="lg" disabled={product.sold} className="w-full sm:w-auto">
              {product.sold ? "No longer available" : "Contact seller"}
            </Button>
            <p className="mt-2 text-xs text-gray-400">
              Prototype: seller contact is mocked — this will connect to the seller&apos;s
              college email in the full build.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
