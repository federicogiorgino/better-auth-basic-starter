import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";
import type { accomplishments } from "@/drizzle/schemas/accomplishment";
import type {
  accomplishmentQuerySchema,
  createAccomplishmentSchema,
  updateAccomplishmentSchema,
} from "@/schemas/accomplishement";
import type { Category } from "./category";

export type CreateAccomplishmentFormValues = z.infer<
  typeof createAccomplishmentSchema
>;
export type UpdateAccomplishmentFormValues = z.infer<
  typeof updateAccomplishmentSchema
>;
export type AccomplishmentQuery = z.infer<typeof accomplishmentQuerySchema>;
export type Accomplishment = InferSelectModel<typeof accomplishments>;

export type AccomplishmentWithCategory = Accomplishment & {
  category: Category;
};
