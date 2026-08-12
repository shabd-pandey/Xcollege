"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import type { Product, ProductCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { formatPrice } from "@/utils/format";

const LISTINGS_KEY = "xcollege_listings";

interface Errors {
  title?: string;
  description?: string;
  price?: string;
}

interface ListedProduct extends Product {
  isDraft: true;
}

export function SellProductForm() {
  const { session } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<ProductCategory>("other");
  const [condition, setCondition] = useState("Good");
  const [emoji, setEmoji] = useState("📦");
  const [errors, setErrors] = useState<Errors>({});
  const [created, setCreated] = useState<{ title: string; price: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function getListings(): ListedProduct[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(LISTINGS_KEY);
    try {
      return raw ? (JSON.parse(raw) as ListedProduct[]) : [];
    } catch {
      return [];
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!title.trim()) nextErrors.title = "Title is required.";
    if (!description.trim()) nextErrors.description = "Add a short description.";
    const priceValue = Number(price);
    if (!price || Number.isNaN(priceValue) || priceValue <= 0) {
      nextErrors.price = "Enter a valid price.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const listing: ListedProduct = {
      id: `sell-${Date.now()}`,
      title,
      description,
      price: priceValue,
      originalPrice: priceValue,
      category,
      categoryLabel:
        PRODUCT_CATEGORIES.find((c) => c.value === category)?.label ?? "Other",
      condition,
      sellerName: session?.name ?? "Anonymous",
      sellerSemester: session?.semester ?? 1,
      listedAt: new Date().toISOString().slice(0, 10),
      emoji,
      sold: false,
      isDraft: true,
    };
    await new Promise((resolve) => setTimeout(resolve, 500));
    const listings = getListings();
    listings.unshift(listing);
    window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
    setCreated({ title, price: priceValue });
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("other");
    setCondition("Good");
    setSubmitting(false);
  }

  return (
    <div className="space-y-6">
      {created && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <p className="font-medium">Listing created!</p>
          <p className="mt-1">
            &quot;{created.title}&quot; ({formatPrice(created.price)}) is now live in the
            products section (saved locally in this prototype).
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Input
              id="title"
              label="Product title"
              placeholder="e.g. Casio FX-991ES Calculator"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              error={errors.title}
            />
          </div>
          <Input
            id="price"
            label="Price (₹)"
            type="number"
            min="1"
            placeholder="850"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            error={errors.price}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select
            id="category"
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value as ProductCategory)}
            options={PRODUCT_CATEGORIES.filter((c) => c.value !== "all").map((c) => ({
              value: c.value,
              label: c.label,
            }))}
          />
          <Select
            id="condition"
            label="Condition"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
            options={["Like New", "Good", "Fair"]}
          />
          <Input
            id="emoji"
            label="Emoji"
            maxLength={2}
            value={emoji}
            onChange={(event) => setEmoji(event.target.value || "📦")}
          />
        </div>
        <Textarea
          id="description"
          label="Description"
          placeholder="Condition details, what's included, pickup location..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          error={errors.description}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Listing..." : "List product"}
        </Button>
      </form>

      {getListings().length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Your listings</h3>
          <div className="space-y-2">
            {getListings().map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{listing.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                    <p className="text-xs text-gray-500">{listing.categoryLabel}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(listing.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
