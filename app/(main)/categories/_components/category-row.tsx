"use client";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { CategoryDot } from "@/components/category-dot";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryPanelStore } from "@/store/categories-panel-store";
import type { Category } from "@/types/category";
import { pluralize } from "@/utils/string";

export function CategoryRow({ category }: { category: Category }) {
  const { openEdit, openDelete } = useCategoryPanelStore();

  return (
    <div className="group flex items-center gap-4 border-b border-stone-200/80 py-4">
      <CategoryDot color={category.color} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-baseline gap-2">
          <span className="truncate font-mono font-medium text-foreground">
            {category.name}
          </span>

          <span className="text-xs tabular-nums text-muted-foreground">
            {category.accomplishmentCount}{" "}
            {pluralize(category.accomplishmentCount, "accomplishment")}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 cursor-pointer">
        <button
          type="button"
          onClick={() => openEdit(category, "drawer")}
          aria-label={`Edit ${category.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => openDelete(category)}
          aria-label={`Delete ${category.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Mobile / fallback menu */}
      <button
        type="button"
        aria-label={`More options for ${category.name}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}

export function CategoryRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-stone-200/80 py-4">
      <Skeleton className="h-2.5 w-2.5 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-baseline gap-2">
          <Skeleton className="h-3.5 w-1/2 rounded-full" />
          <Skeleton className="h-3.5 w-1/3 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 cursor-pointer">
        <Skeleton className="h-3.5 w-15 rounded-full" />
        <Skeleton className="h-3.5 w-15 rounded-full" />
      </div>
    </div>
  );
}
