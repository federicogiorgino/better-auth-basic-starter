"use client";

import { Plus } from "lucide-react";
import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";
import { Button } from "./ui/button";

export default function AccomplishmentButton() {
  const { openCreate } = useAccomplishmentPanelStore();
  return (
    <Button
      onClick={() => openCreate("drawer")}
      className="mt-6.5 mb-2.25 flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary p-2.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <Plus size={17} />
      Add accomplishment
      <kbd className="ml-auto text-[10px] text-primary-foreground/60">N</kbd>
    </Button>
  );
}
