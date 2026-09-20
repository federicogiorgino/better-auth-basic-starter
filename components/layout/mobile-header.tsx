"use client";

import { NotebookPen } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function MobileHeader() {
  return (
    <div className="absolute top-0 right-0 left-0 hidden items-center justify-between border-b px-5 py-4.25 max-[800px]:flex">
      <span className="flex items-center gap-2.25 text-[10px] font-bold tracking-[0.15em]">
        <span className="grid size-6.75 place-items-center rounded-[7px] bg-sidebar-primary tracking-normal text-sidebar-primary-foreground">
          <NotebookPen size={15} />
        </span>
        WORK LOG
      </span>

      <SidebarTrigger />
    </div>
  );
}
