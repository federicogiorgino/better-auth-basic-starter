import { create } from "zustand";
import type { PanelMode } from "@/types/panel";

type CalendarDayPanelState = {
  isOpen: boolean;
  mode: PanelMode;
  selectedDate: string | null;
  open: (date: string, mode: PanelMode) => void;
  close: () => void;
};

export const useCalendarDayPanelStore = create<CalendarDayPanelState>(
  (set) => ({
    isOpen: false,
    mode: "modal",
    selectedDate: null,
    open: (date, mode) => set({ isOpen: true, mode, selectedDate: date }),
    close: () => set({ isOpen: false }),
  }),
);
