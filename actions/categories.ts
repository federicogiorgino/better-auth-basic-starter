"use server";

import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/drizzle/db";
import { accomplishments, categories } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import type { Category } from "@/types/category";

export async function getUserCategories(): Promise<Category[]> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return [];
  }

  const data = await db
    .select({
      id: categories.id,
      userId: categories.userId,
      name: categories.name,
      color: categories.color,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,
      accomplishmentCount: count(accomplishments.id),
    })
    .from(categories)
    .leftJoin(accomplishments, eq(accomplishments.categoryId, categories.id))
    .where(eq(categories.userId, session.user.id))
    .groupBy(categories.id);

  // Convert Date objects to strings to match Category type
  return data.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));
}
