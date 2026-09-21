"use client";

import { BookOpen, CalendarDays, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigation = [
  {
    href: "/journal",
    label: "Journal",
    icon: BookOpen,
  },
  {
    href: "/calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    href: "/review",
    label: "Review",
    icon: Sparkles,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-40 hidden h-16 border-t backdrop-blur-sm max-md:flex"
      aria-label="Mobile navigation"
    >
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 text-xs text-muted-foreground",
              active && "text-primary",
            )}
          >
            <Icon size={17} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
