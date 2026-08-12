import { mockFoodPlaces } from "@/data/mock";
import type { FoodPlace, FoodCategory } from "@/types";

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const foodService = {
  async getPlaces(): Promise<FoodPlace[]> {
    await delay();
    return mockFoodPlaces;
  },

  async getPlacesByCategory(category: FoodCategory | "all"): Promise<FoodPlace[]> {
    await delay();
    if (category === "all") return mockFoodPlaces;
    return mockFoodPlaces.filter((place) => place.category === category);
  },

  async getPlaceById(id: string): Promise<FoodPlace | null> {
    await delay();
    return mockFoodPlaces.find((place) => place.id === id) ?? null;
  },

  async countPlaces(): Promise<number> {
    await delay(40);
    return mockFoodPlaces.length;
  },
};
