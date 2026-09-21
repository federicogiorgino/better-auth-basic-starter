"use client";

import { toast } from "sonner";
import { panelTitleClass } from "@/components/panel";
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
import { useCategoryPanelStore } from "@/store/categories-panel-store";

export function CategoryDeleteDialog() {
  const { deletingCategory, closeDelete } = useCategoryPanelStore();
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
      <AlertDialogContent className="gap-5 p-5">
        <AlertDialogHeader>
          <AlertDialogTitle className={panelTitleClass}>
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
            variant="destructive"
          >
            {deleteCategory.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
