import type { FoodCategory, MaterialType, ProductCategory } from "@/types";

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const BRANCHES = [
  "CSE",
  "ECE",
  "EEE",
  "ME",
  "CE",
  "IT",
  "All",
];

export const MATERIAL_TYPES: Array<{ value: MaterialType; label: string }> = [
  { value: "notes", label: "Notes" },
  { value: "pyq", label: "PYQs" },
  { value: "assignment", label: "Assignments" },
  { value: "practical", label: "Practicals" },
];

export const FOOD_CATEGORIES: Array<{ value: FoodCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "food-stall", label: "Food Stalls" },
  { value: "cloud-kitchen", label: "Cloud Kitchens" },
  { value: "cafe", label: "Cafes" },
  { value: "stationery", label: "Stationery & Shops" },
];

export const PRODUCT_CATEGORIES: Array<{ value: ProductCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "books", label: "Books" },
  { value: "electronics", label: "Electronics" },
  { value: "cycle", label: "Cycles" },
  { value: "furniture", label: "Furniture" },
  { value: "stationery", label: "Stationery" },
  { value: "other", label: "Other" },
];
