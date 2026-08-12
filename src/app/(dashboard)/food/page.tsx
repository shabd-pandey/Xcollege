import type { Metadata } from "next";
import { foodService } from "@/services/foodService";
import { FOOD_CATEGORIES } from "@/lib/constants";
import type { FoodCategory } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterTabs, type FilterTabItem } from "@/components/ui/FilterTabs";
import { FoodPlaceCard } from "@/components/food/FoodPlaceCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Food & Shops Around Campus",
};

interface FoodPageProps {
  searchParams: Promise<{ category?: string }>;
}

function parseCategory(raw: string | undefined): FoodCategory | "all" {
  if (raw && FOOD_CATEGORIES.some((c) => c.value === raw)) {
    return raw as FoodCategory;
  }
  return "all";
}

export default async function FoodPage({ searchParams }: FoodPageProps) {
  const params = await searchParams;
  const category = parseCategory(params.category);
  const places = await foodService.getPlacesByCategory(category);

  const tabs: FilterTabItem[] = FOOD_CATEGORIES.map((item) => ({
    label: item.label,
    href: item.value === "all" ? "/food" : `/food?category=${item.value}`,
    active: category === item.value,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Food & Shops Around Campus"
        description="Know what's selling near college and at what price — no more guessing."
      />

      <FilterTabs items={tabs} />

      <p className="text-sm text-gray-500">
        {places.length} place{places.length === 1 ? "" : "s"} near campus
      </p>

      {places.length === 0 ? (
        <EmptyState
          icon="🍽️"
          title="No places in this category"
          description="We haven't mapped this category yet. Check back soon!"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <FoodPlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
