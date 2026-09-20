import type { InferSelectModel } from "drizzle-orm";
import type { accomplishments } from "@/drizzle/schemas/accomplishment";
import type { Category } from "./category";

export type Accomplishment = InferSelectModel<typeof accomplishments>;

export type AccomplishmentWithCategory = Accomplishment & {
  category: Category;
};
