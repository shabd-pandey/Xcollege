import { mockProducts } from "@/data/mock";
import type { Product, ProductCategory } from "@/types";

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    await delay();
    return mockProducts.filter((product) => !product.sold);
  },

  async getProductsByCategory(category: ProductCategory | "all"): Promise<Product[]> {
    await delay();
    const available = mockProducts.filter((product) => !product.sold);
    if (category === "all") return available;
    return available.filter((product) => product.category === category);
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay();
    return mockProducts.find((product) => product.id === id) ?? null;
  },

  async countProducts(): Promise<number> {
    await delay(40);
    return mockProducts.filter((product) => !product.sold).length;
  },
};
