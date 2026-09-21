// components/form-panel.tsx
"use client";

import type { ReactNode } from "react";
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
import { cn } from "@/lib/utils";

interface PanelProps {
  mode: "modal" | "drawer";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  side?: "left" | "right"; // only used in drawer mode
  className?: string;
  contentClassName?: string;
}

const panelHeaderClass = "border-b px-5 py-4 text-left";
const panelBodyClass = "px-5 py-5";
export const panelTitleClass =
  "font-sans text-xs font-bold tracking-widest text-muted-foreground uppercase";

export function Panel({
  mode,
  open,
  onOpenChange,
  title,
  children,
  side = "right",
  className,
  contentClassName,
}: PanelProps) {
  if (mode === "drawer") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side={side}
          className={cn(
            "overflow-y-auto p-0 max-sm:w-full max-sm:max-w-none",
            className,
          )}
        >
          <SheetHeader className={panelHeaderClass}>
            <SheetTitle className={panelTitleClass}>{title}</SheetTitle>
          </SheetHeader>
          <div className={cn(panelBodyClass, contentClassName)}>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("gap-0 p-0 sm:max-w-md", className)}>
        <DialogHeader className={panelHeaderClass}>
          <DialogTitle className={panelTitleClass}>{title}</DialogTitle>
        </DialogHeader>
        <div className={cn(panelBodyClass, contentClassName)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
