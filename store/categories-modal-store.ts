import { create } from "zustand";

type EditingCategory = { id: string; name: string; color: string };
type DeletingCategory = { id: string; name: string };

type CategoryModalState = {
  isOpen: boolean;
  editingCategory: EditingCategory | null;
  openCreate: () => void;
  openEdit: (category: EditingCategory) => void;
  close: () => void;

  deletingCategory: DeletingCategory | null;
  openDelete: (category: DeletingCategory) => void;
  closeDelete: () => void;
};

export const useCategoryModalStore = create<CategoryModalState>((set) => ({
  isOpen: false,
  editingCategory: null,
  openCreate: () => set({ isOpen: true, editingCategory: null }),
  openEdit: (category) => set({ isOpen: true, editingCategory: category }),
  close: () => set({ isOpen: false }), // <- no longer clears editingCategory

  deletingCategory: null,
  openDelete: (category) => set({ deletingCategory: category }),
  closeDelete: () => set({ deletingCategory: null }),
}));
