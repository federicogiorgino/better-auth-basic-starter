import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { accomplishments, categories } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { updateAccomplishmentSchema } from "@/schemas/accomplishement";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const parsed = updateAccomplishmentSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { categoryId, impact, notes, link, ...rest } = parsed.data;

  if (categoryId) {
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
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }
  }

  const [updated] = await db
    .update(accomplishments)
    .set({
      ...rest,
      ...(categoryId && { categoryId }),
      ...(impact !== undefined && { impact: impact || null }),
      ...(notes !== undefined && { notes: notes || null }),
      ...(link !== undefined && { link: link || null }),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(accomplishments.id, id),
        eq(accomplishments.userId, session.user.id),
      ),
    )
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [deleted] = await db
    .delete(accomplishments)
    .where(
      and(
        eq(accomplishments.id, id),
        eq(accomplishments.userId, session.user.id),
      ),
    )
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
