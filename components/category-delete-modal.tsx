"use client";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCategory } from "@/hooks/use-categories";
import { useCategoryModalStore } from "@/store/categories-modal-store";

export function CategoryDeleteDialog() {
  const { deletingCategory, closeDelete } = useCategoryModalStore();
  const deleteCategory = useDeleteCategory();

  function handleConfirm() {
    if (!deletingCategory) return;

    deleteCategory.mutate(deletingCategory.id, {
      onSuccess: () => {
        toast.success(`"${deletingCategory.name}" deleted.`);
        closeDelete();
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete category.",
        );
      },
    });
  }

  return (
    <AlertDialog
      open={Boolean(deletingCategory)}
      onOpenChange={(open) => !open && closeDelete()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold mb-3">
            Delete category?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">
              {deletingCategory?.name}
            </span>
            . Categories with accomplishments attached can&apos;t be deleted —
            reassign or remove those first.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteCategory.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteCategory.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteCategory.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
