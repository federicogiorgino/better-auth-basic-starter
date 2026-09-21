import { randomUUID } from "node:crypto";
import { and, asc, count, desc, eq, gte, ilike, lte } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { accomplishments, categories } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import {
  accomplishmentQuerySchema,
  createAccomplishmentSchema,
} from "@/schemas/accomplishement";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsedQuery = accomplishmentQuerySchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams),
  );
  if (!parsedQuery.success) {
    return NextResponse.json(
      { error: parsedQuery.error.flatten() },
      { status: 400 },
    );
  }

  const {
    search,
    categoryId,
    dateFrom,
    dateTo,
    page,
    pageSize,
    sortBy,
    sortOrder,
  } = parsedQuery.data;

  const conditions = [eq(accomplishments.userId, session.user.id)];

  if (search) {
    conditions.push(ilike(accomplishments.title, `%${search}%`));
  }
  if (categoryId) {
    conditions.push(eq(accomplishments.categoryId, categoryId));
  }
  if (dateFrom) {
    conditions.push(gte(accomplishments.date, dateFrom));
  }
  if (dateTo) {
    conditions.push(lte(accomplishments.date, dateTo));
  }

  const whereClause = and(...conditions);

  const sortColumn =
    sortBy === "title"
      ? accomplishments.title
      : sortBy === "createdAt"
        ? accomplishments.createdAt
        : accomplishments.date;
  const orderFn = sortOrder === "asc" ? asc : desc;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        id: accomplishments.id,
        userId: accomplishments.userId,
        categoryId: accomplishments.categoryId,
        categoryName: categories.name,
        categoryColor: categories.color,
        title: accomplishments.title,
        date: accomplishments.date,
        impact: accomplishments.impact,
        notes: accomplishments.notes,
        link: accomplishments.link,
        createdAt: accomplishments.createdAt,
        updatedAt: accomplishments.updatedAt,
      })
      .from(accomplishments)
      .innerJoin(categories, eq(accomplishments.categoryId, categories.id))
      .where(whereClause)
      .orderBy(orderFn(sortColumn))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ total: count() }).from(accomplishments).where(whereClause),
  ]);

  return NextResponse.json({
    data: rows,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = createAccomplishmentSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { categoryId, title, date, impact, notes, link } = parsed.data;

  // Verify the category belongs to this user before attaching it
  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(
      and(
        eq(categories.id, categoryId),
        eq(categories.userId, session.user.id),
      ),
    );

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const [accomplishment] = await db
    .insert(accomplishments)
    .values({
      id: randomUUID(),
      userId: session.user.id,
      categoryId,
      title,
      date,
      impact: impact || null,
      notes: notes || null,
      link: link || null,
    })
    .returning();

  return NextResponse.json(accomplishment, { status: 201 });
}
