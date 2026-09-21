import { BookOpen, CalendarDays, Home, Sparkles } from "lucide-react";

export const NAVIGATION_MAIN_LINKS = [
  {
    href: "/",
    label: "Today",
    icon: Home,
  },
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
