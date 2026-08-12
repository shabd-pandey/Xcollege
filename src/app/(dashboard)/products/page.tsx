import type { Metadata } from "next";
import { productService } from "@/services/productService";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import type { ProductCategory } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterTabs, type FilterTabItem } from "@/components/ui/FilterTabs";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Second-hand Products",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

function parseCategory(raw: string | undefined): ProductCategory | "all" {
  if (raw && PRODUCT_CATEGORIES.some((c) => c.value === raw)) {
    return raw as ProductCategory;
  }
  return "all";
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = parseCategory(params.category);
  const products = await productService.getProductsByCategory(category);

  const tabs: FilterTabItem[] = PRODUCT_CATEGORIES.map((item) => ({
    label: item.label,
    href: item.value === "all" ? "/products" : `/products?category=${item.value}`,
    active: category === item.value,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Second-hand Products"
        description="Buy and sell used books, electronics, cycles and more within the campus community."
      >
        <Link href="/products/sell">
          <Button>Sell a product</Button>
        </Link>
      </PageHeader>

      <FilterTabs items={tabs} />

      <p className="text-sm text-gray-500">
        {products.length} item{products.length === 1 ? "" : "s"} available
      </p>

      {products.length === 0 ? (
        <EmptyState
          icon="🛍️"
          title="No products in this category"
          description="Be the first to list one — your unused stuff could help a fellow student."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
