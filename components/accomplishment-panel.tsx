// components/accomplishment-modal.tsx
"use client";

import { Panel } from "@/components/panel";
import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";

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
      <div>CIAO</div>
      <div>CIAO</div>
      <div>CIAO</div>
      <div>CIAO</div>
      <div>CIAO</div>
      <div>CIAO</div>
      <div>CIAO</div>
      <div>CIAO</div>
      {/* <AccomplishmentForm defaultValues={editingAccomplishment} onSuccess={close} /> */}
    </Panel>
  );
}
