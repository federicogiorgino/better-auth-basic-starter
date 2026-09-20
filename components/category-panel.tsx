// components/category-modal.tsx
"use client";

import { CategoryForm } from "@/components/category-form";
import { Panel } from "@/components/panel";
import { useCategoryPanelStore } from "@/store/categories-panel-store";

export function CategoryPanel() {
  const { isOpen, mode, editingCategory, close } = useCategoryPanelStore();

  return (
    <Panel
      mode={mode}
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      title={editingCategory ? "Edit category" : "New category"}
    >
      <CategoryForm defaultValues={editingCategory} onSuccess={close} />
    </Panel>
  );
}
