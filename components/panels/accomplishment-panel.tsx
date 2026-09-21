"use client";

import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";
import { AccomplishmentForm } from "../forms/accomplishment-form";
import { Panel } from "../panel";

export function AccomplishmentPanel() {
  const { isOpen, mode, editingAccomplishment, close } =
    useAccomplishmentPanelStore();

  const title = editingAccomplishment
    ? "Edit accomplishment"
    : "New accomplishment";

  return (
    <Panel
      mode={mode}
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      title={title}
    >
      <AccomplishmentForm
        defaultValues={editingAccomplishment}
        onSuccess={close}
      />
    </Panel>
  );
}
