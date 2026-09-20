import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";
import type { categories } from "@/drizzle/schemas/category";
import type {
  createCategorySchema,
  updateCategorySchema,
} from "@/schemas/category";

// export type Category = {
//   id: string;
//   userId: string;
//   name: string;
//   color: string;
//   createdAt: string;
//   updatedAt: string;
//   accomplishmentCount: number;
// };

export type Category = InferSelectModel<typeof categories> & {
  accomplishmentCount: number;
};

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
