import type { AccomplishmentQuery } from "@/types/accomplishment";

export type Accomplishment = {
  id: string;
  userId: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  title: string;
  date: string;
  impact: string | null;
  notes: string | null;
  link: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedAccomplishments = {
  data: Accomplishment[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export async function fetchAccomplishments(
  query: Partial<AccomplishmentQuery>,
): Promise<PaginatedAccomplishments> {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });

  const res = await fetch(`/api/accomplishments?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch accomplishments");
  return res.json();
}

export async function createAccomplishment(input: {
  categoryId: string;
  title: string;
  date: string;
  impact?: string;
  notes?: string;
  link?: string;
}) {
  const res = await fetch("/api/accomplishments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "Failed to create accomplishment");
  }
  return res.json();
}

export async function updateAccomplishment(
  id: string,
  input: Partial<{
    categoryId: string;
    title: string;
    date: string;
    impact: string;
    notes: string;
    link: string;
  }>,
) {
  const res = await fetch(`/api/accomplishments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "Failed to update accomplishment");
  }
  return res.json();
}

export async function deleteAccomplishment(id: string) {
  const res = await fetch(`/api/accomplishments/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "Failed to delete accomplishment");
  }
  return res.json();
}
