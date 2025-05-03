import { Category } from "@/payload-types";

// Clear and explicit type definition
export type CustomCategory = {
  id: string;
  name: string;
  slug: string;
  color?: string | null;
  parent?: string | null | Category;
  updatedAt: string;
  createdAt: string;
  subcategories: CustomCategory[]; // Array of CustomCategory, not the original Payload structure
};