export type MaterialType = "notes" | "pyq" | "assignment" | "practical";

export type MaterialStatus = "approved" | "pending" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  branch: string;
  semester: number | null;
  role: "student" | "admin";
  avatarInitial: string;
}

export interface Session {
  userId: string;
  name: string;
  email: string;
  branch: string;
  semester: number | null;
  role: "student" | "admin";
  avatarInitial: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  type: MaterialType;
  semester: number;
  branch: string;
  description: string;
  fileSize: string;
  format: "pdf" | "docx" | "pptx";
  downloads: number;
  uploadedBy: string;
  uploadedAt: string;
  status: MaterialStatus;
}

export interface MenuItem {
  name: string;
  price: number;
}

export type FoodCategory = "food-stall" | "cloud-kitchen" | "stationery" | "cafe";

export interface FoodPlace {
  id: string;
  name: string;
  category: FoodCategory;
  categoryLabel: string;
  description: string;
  distanceKm: number;
  opensAt: string;
  closesAt: string;
  rating: number;
  tags: string[];
  menu: MenuItem[];
  isPopular?: boolean;
}

export type ProductCategory = "books" | "electronics" | "cycle" | "furniture" | "stationery" | "other";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: ProductCategory;
  categoryLabel: string;
  condition: string;
  sellerName: string;
  sellerSemester: number;
  listedAt: string;
  emoji: string;
  sold: boolean;
}

export interface DashboardStats {
  notesCount: number;
  foodPlacesCount: number;
  productsCount: number;
  yourUploadsCount: number;
  pendingUploadsCount: number;
}

export interface UploadDraft {
  id: string;
  title: string;
  subject: string;
  type: MaterialType;
  semester: number;
  branch: string;
  description: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  status: MaterialStatus;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  branch: string;
  semester: number;
}
