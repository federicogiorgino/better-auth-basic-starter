import type { ReactNode } from "react";
import { getUserCategories } from "@/actions/categories";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileHeader } from "@/components/layout/mobile-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const categories = await getUserCategories();

  return (
    <SidebarProvider>
      <AppSidebar categories={categories} />

      <SidebarInset className="relative">
        <MobileHeader />
        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-262.5 px-18 pt-17.5 pb-25 max-[800px]:px-5 max-[800px]:pt-8">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
