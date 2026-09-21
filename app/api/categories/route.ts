import { randomUUID } from "node:crypto";
import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { accomplishments, categories } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { createCategorySchema } from "@/schemas/category";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = createCategorySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const [category] = await db
    .insert(categories)
    .values({
      id: randomUUID(),
      userId: session.user.id,
      name: parsed.data.name,
      color: parsed.data.color,
    })
    .returning();

  return NextResponse.json(category, { status: 201 });
}
