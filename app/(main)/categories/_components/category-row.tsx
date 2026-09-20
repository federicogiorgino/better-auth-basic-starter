"use client";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useCategoryModalStore } from "@/store/categories-modal-store";
import type { Category } from "@/types/category";

export function CategoryRow({ category }: { category: Category }) {
  const { openEdit, openDelete } = useCategoryModalStore();

  return (
    <div className="group flex items-center gap-4 border-b border-stone-200/80 py-4">
      {/* Color indicator */}
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: category.color }}
        aria-hidden="true"
      />

      {/* Category name */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-baseline gap-2">
          <span className="truncate text-[15px] font-medium font-mono tracking-[-0.01em] text-stone-900">
            {category.name}
          </span>

          <span className="text-xs tabular-nums text-stone-400">
            {category.accomplishmentCount}{" "}
            {category.accomplishmentCount === 1
              ? "accomplishment"
              : "accomplishments"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 cursor-pointer">
        <button
          type="button"
          onClick={() => openEdit(category)}
          aria-label={`Edit ${name}`}
          className="flex h-8 w-8 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
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
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 md:hidden"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
