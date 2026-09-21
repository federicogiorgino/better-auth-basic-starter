"use client";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { CategoryDot } from "@/components/category-dot";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryPanelStore } from "@/store/categories-panel-store";
import type { Category } from "@/types/category";
import { pluralize } from "@/utils/string";

export function CategoryRow({ category }: { category: Category }) {
  const { openEdit, openDelete } = useCategoryPanelStore();

  return (
    <div className="group flex items-center gap-4 border-b py-4">
      <CategoryDot color={category.color} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-baseline gap-2">
          <span className="truncate font-serif font-medium text-foreground tracking-tight">
            {category.name}
          </span>

          <span className="text-xs tabular-nums text-muted-foreground">
            {category.accomplishmentCount}{" "}
            {pluralize(category.accomplishmentCount, "accomplishment")}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => openEdit(category, "drawer")}
          aria-label={`Edit ${category.name}`}
        >
          <Pencil />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => openDelete(category)}
          aria-label={`Delete ${category.name}`}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 />
        </Button>
      </div>

      {/* Mobile / fallback menu */}
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`More options for ${category.name}`}
        className="shrink-0 md:hidden"
      >
        <MoreHorizontal />
      </Button>
    </div>
  );
}

export function CategoryRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Skeleton className="h-2.5 w-2.5 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-baseline gap-2">
          <Skeleton className="h-3.5 w-1/2 rounded-full" />
          <Skeleton className="h-3.5 w-1/3 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <Skeleton className="h-3.5 w-15 rounded-full" />
        <Skeleton className="h-3.5 w-15 rounded-full" />
      </div>
    </div>
  );
}
