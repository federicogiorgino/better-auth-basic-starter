import { create } from "zustand";
import type { EditingAccomplishment } from "@/types/accomplishment";
import type { PanelMode } from "@/types/panel";

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
    close: () => set({ isOpen: false }), // don't clear editingAccomplishment — avoids title/content flicker on close animation
  }),
);
