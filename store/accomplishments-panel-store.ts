// store/accomplishments-modal-store.ts
import { create } from "zustand";

type PanelMode = "modal" | "drawer";

type EditingAccomplishment = {
  id: string;
  title: string;
  date: string;
  categoryId: string;
};

type AccomplishmentPanelState = {
  isOpen: boolean;
  mode: PanelMode;
  editingAccomplishment: EditingAccomplishment | null;
  openCreate: (mode: PanelMode) => void;
  openEdit: (accomplishment: EditingAccomplishment, mode: PanelMode) => void;
  close: () => void;
};

export const useAccomplishmentPanelStore = create<AccomplishmentPanelState>(
  (set) => ({
    isOpen: false,
    mode: "modal",
    editingAccomplishment: null,
    openCreate: (mode) =>
      set({ isOpen: true, mode, editingAccomplishment: null }),
    openEdit: (accomplishment, mode) =>
      set({ isOpen: true, mode, editingAccomplishment: accomplishment }),
    close: () => set({ isOpen: false, editingAccomplishment: null }),
  }),
);
