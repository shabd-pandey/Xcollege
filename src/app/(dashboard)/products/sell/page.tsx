import type { Metadata } from "next";
import { SellProductForm } from "@/components/forms/SellProductForm";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Sell a product",
};

export default function SellProductPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Sell a product"
        description="Got second-hand books, electronics or a cycle you don't need? List it for fellow students."
      />
      <Card>
        <CardContent className="p-6">
          <SellProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
