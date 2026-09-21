"use client";

import { NotebookPen } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function MobileHeader() {
  return (
    <div className="absolute top-0 right-0 left-0 hidden items-center justify-between border-b px-5 py-4 max-md:flex">
      <span className="flex items-center gap-2 text-xs font-bold tracking-widest">
        <span className="grid size-7 place-items-center rounded-md bg-sidebar-primary tracking-normal text-sidebar-primary-foreground">
          <NotebookPen size={15} />
        </span>
        TRACENOTES
      </span>

      <SidebarTrigger />
    </div>
  );
}
