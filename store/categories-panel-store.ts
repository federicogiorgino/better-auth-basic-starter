// store/categories-panel-store.ts
import { create } from "zustand";
import type { DeletingCategory, EditingCategory } from "@/types/category";
import type { PanelMode } from "@/types/panel";

type CategoryPanelState = {
  isOpen: boolean;
  mode: PanelMode;
  editingCategory: EditingCategory | null;
  openCreate: (mode: PanelMode) => void;
  openEdit: (category: EditingCategory, mode: PanelMode) => void;
  close: () => void;

  deletingCategory: DeletingCategory | null;
  openDelete: (category: DeletingCategory) => void;
  closeDelete: () => void;
};

export const useCategoryPanelStore = create<CategoryPanelState>((set) => ({
  isOpen: false,
  mode: "modal",
  editingCategory: null,
  openCreate: (mode) => set({ isOpen: true, mode, editingCategory: null }),
  openEdit: (category, mode) =>
    set({ isOpen: true, mode, editingCategory: category }),
  close: () => set({ isOpen: false, editingCategory: null }),
  deletingCategory: null,
  openDelete: (category) => set({ deletingCategory: category }),
  closeDelete: () => set({ deletingCategory: null }),
}));
