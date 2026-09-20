"use client";

import { CategoryForm } from "@/components/category-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryModalStore } from "@/store/categories-modal-store";

export function CategoryModal() {
  const { isOpen, editingCategory, close } = useCategoryModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {editingCategory ? "Edit category" : "New category"}
          </DialogTitle>
        </DialogHeader>

        <CategoryForm defaultValues={editingCategory} onSuccess={close} />
      </DialogContent>
    </Dialog>
  );
}
