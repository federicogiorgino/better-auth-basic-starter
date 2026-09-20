"use client";
import { useCategories } from "@/hooks/use-categories";

export function HomePageClient() {
  const { data } = useCategories();
  return (
    <div>
      {data?.map((category) => (
        <h1 key={category.id}>{category.name}</h1>
      ))}
    </div>
  );
}
