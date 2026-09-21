import type {
  AccomplishmentQuery,
  CreateAccomplishmentFormValues,
  PaginatedAccomplishments,
  UpdateAccomplishmentFormValues,
} from "@/types/accomplishment";

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

export async function createAccomplishment(
  input: CreateAccomplishmentFormValues,
) {
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
  input: UpdateAccomplishmentFormValues,
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
