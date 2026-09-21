"use client";

import { Plus } from "lucide-react";
import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";
import { Button } from "./ui/button";

export default function AccomplishmentButton() {
  const { openCreate } = useAccomplishmentPanelStore();
  return (
    <Button
      onClick={() => openCreate("drawer")}
      className="mt-6 mb-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary p-2.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <Plus size={17} />
      Add accomplishment
      <kbd className="ml-auto text-xs text-primary-foreground/60">N</kbd>
    </Button>
  );
}
