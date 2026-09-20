import type { z } from "zod";
import type {
  createCategorySchema,
  updateCategorySchema,
} from "@/schemas/category";

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
