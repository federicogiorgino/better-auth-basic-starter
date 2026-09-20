// components/form-panel.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface PanelProps {
  mode: "modal" | "drawer";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  side?: "left" | "right"; // only used in drawer mode
}

export function Panel({
  mode,
  open,
  onOpenChange,
  title,
  children,
  side = "right",
}: PanelProps) {
  if (mode === "drawer") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side={side} className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-md uppercase font-sans font-semibold">
              {title}
            </SheetTitle>
          </SheetHeader>
          <div className="px-4">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md uppercase font-sans font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
