// components/accomplishment-modal.tsx
"use client";

import { Panel } from "@/components/panel";
import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";
import { AccomplishmentForm } from "../forms/accomplishment-form";

export function AccomplishmentPanel() {
  const { isOpen, mode, editingAccomplishment, close } =
    useAccomplishmentPanelStore();

  return (
    <Panel
      mode={mode}
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      title={
        editingAccomplishment ? "Edit accomplishment" : "New accomplishment"
      }
    >
      <AccomplishmentForm defaultValues={editingAccomplishment} />
    </Panel>
  );
}
