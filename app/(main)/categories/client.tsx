"use client";

import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/use-categories";
import { useCategoryModalStore } from "@/store/categories-modal-store";
import { CategoryRow } from "./_components/category-row";

export function CategoriesPageClient() {
  const { data } = useCategories();
  const { openCreate } = useCategoryModalStore();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1>Your Categories</h1>
        <Button onClick={openCreate}>+ Create Category</Button>
      </div>
      <div className="flex flex-col gap-2">
        {data?.map((category) => (
          <CategoryRow category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}
