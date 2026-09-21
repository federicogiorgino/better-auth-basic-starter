import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";
import type { categories } from "@/drizzle/schemas/category";
import type {
  createCategorySchema,
  updateCategorySchema,
} from "@/schemas/category";

export type CategoryRecord = InferSelectModel<typeof categories>;

export type CategorySummary = Pick<CategoryRecord, "id" | "name" | "color">;

export type CategoryWithAccomplishmentCount = CategoryRecord & {
  accomplishmentCount: number;
};

export type Category = CategoryWithAccomplishmentCount;
export type EditingCategory = CategorySummary;
export type DeletingCategory = Pick<CategoryRecord, "id" | "name">;

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
