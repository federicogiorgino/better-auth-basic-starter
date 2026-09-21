import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";
import type { accomplishments } from "@/drizzle/schemas/accomplishment";
import type {
  accomplishmentQuerySchema,
  createAccomplishmentSchema,
  updateAccomplishmentSchema,
} from "@/schemas/accomplishement";
import type { CategorySummary } from "./category";

export type CreateAccomplishmentFormValues = z.infer<
  typeof createAccomplishmentSchema
>;
export type UpdateAccomplishmentFormValues = z.infer<
  typeof updateAccomplishmentSchema
>;
export type AccomplishmentQuery = z.infer<typeof accomplishmentQuerySchema>;
export type AccomplishmentRecord = InferSelectModel<typeof accomplishments>;
export type Accomplishment = AccomplishmentRecord;

export type EditingAccomplishment = Pick<
  AccomplishmentRecord,
  "id" | "title" | "date" | "categoryId" | "impact" | "notes" | "link"
>;

export type AccomplishmentWithCategory = Accomplishment & {
  category: CategorySummary;
};

export type SerializedAccomplishment = Omit<
  Accomplishment,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

export type AccomplishmentListItem = SerializedAccomplishment & {
  categoryName: string;
  categoryColor: string;
};

export type PaginatedAccomplishments = {
  data: AccomplishmentListItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};
