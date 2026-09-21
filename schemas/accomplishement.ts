import { z } from "zod";

export const createAccomplishmentSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required").max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  impact: z.string().max(2000).optional().or(z.literal("")),
  notes: z.string().max(5000).optional().or(z.literal("")),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const updateAccomplishmentSchema = createAccomplishmentSchema.partial();

// Query params for GET /api/accomplishments
export const accomplishmentQuerySchema = z.object({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  dateFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  dateTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["date", "createdAt", "title"]).default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
