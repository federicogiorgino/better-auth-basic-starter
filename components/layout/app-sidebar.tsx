"use client";

import { NotebookPen, Plus, Settings, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAVIGATION_MAIN_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";

type AppSidebarProps = {
  categories: Category[];
};

function CategoryDot({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-block size-[7px] shrink-0 rounded-full", className)}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

export function AppSidebar({ categories }: AppSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavigate = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r">
      <SidebarHeader className="gap-0 px-3 pt-4 pb-0">
        {/* Logo */}
        <Link
          href="/journal"
          onClick={handleNavigate}
          className="flex items-center gap-[9px] px-2 text-[11px] font-bold tracking-[0.15em]"
        >
          <span className="grid size-[27px] place-items-center rounded-[7px] bg-sidebar-primary tracking-normal text-sidebar-primary-foreground">
            <NotebookPen size={16} />
          </span>

          <span>WORK LOG</span>
        </Link>

        {/* Add button */}
        <Link
          href="/journal?new=1"
          onClick={handleNavigate}
          className="mt-[26px] mb-[9px] flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary px-[9px] py-[11px] text-xs text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus size={17} />
          Add accomplishment
          <kbd className="ml-auto text-[10px] text-primary-foreground/60">
            N
          </kbd>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {NAVIGATION_MAIN_LINKS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.href} onClick={handleNavigate}>
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
            Your categories
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/journal?category=${encodeURIComponent(category.name)}`}
                      onClick={handleNavigate}
                    >
                      <CategoryDot color={category.color} />
                      {category.name}
                      <span className="ml-auto text-[11px] text-muted-foreground">
                        {category.accomplishmentCount}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/categories")}>
              <Link href="/categories" onClick={handleNavigate}>
                <SlidersHorizontal size={16} />
                Categories
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")}>
              <Link href="/settings" onClick={handleNavigate}>
                <Settings size={16} />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <span className="mt-[10px] block px-2 text-[10px] text-muted-foreground">
          September 2026 · v1.0
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}
