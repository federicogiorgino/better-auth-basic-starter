"use client";

import { useState } from "react";
import { PageHeading } from "@/components/page-heading";
import type { AccomplishmentWithCategory } from "@/types/accomplishment";
import AccomplishmentRow from "./_components/accomplishment-row";
import { Controls } from "./_components/controls";

export const accomplishments: AccomplishmentWithCategory[] = [
  {
    id: "1",
    userId: "user-1",
    categoryId: "projects",
    title: "Automated weekly reporting",
    date: "2026-09-21",
    impact: "Saved the team around six hours each week.",
    notes:
      "Connected the existing exports and added a clean summary for the Monday stand-up.",
    link: null,
    createdAt: new Date("2026-09-21T09:42:00"),
    updatedAt: new Date("2026-09-21T09:42:00"),
    category: {
      id: "projects",
      name: "Projects",
      color: "#7C6F64",
    },
  },
  {
    id: "2",
    userId: "user-1",
    categoryId: "meetings",
    title: "Led project kickoff",
    date: "2026-09-21",
    impact: null,
    notes:
      "Aligned the team around a clear brief, milestones, and what success looks like.",
    link: null,
    createdAt: new Date("2026-09-21T11:15:00"),
    updatedAt: new Date("2026-09-21T11:15:00"),
    category: {
      id: "meetings",
      name: "Meetings",
      color: "#8A8178",
    },
  },
  {
    id: "3",
    userId: "user-1",
    categoryId: "wins",
    title: "Mentored a new teammate",
    date: "2026-09-21",
    impact: null,
    notes:
      "Practiced the story arc together and shared the presentation checklist.",
    link: null,
    createdAt: new Date("2026-09-21T14:15:00"),
    updatedAt: new Date("2026-09-21T14:15:00"),
    category: {
      id: "wins",
      name: "Wins",
      color: "#6F7D68",
    },
  },
  {
    id: "4",
    userId: "user-1",
    categoryId: "projects",
    title: "Improved onboarding flow",
    date: "2026-09-18",
    impact: "Reduced time-to-first-value for new accounts.",
    notes: "Removed three confusing steps from the new customer journey.",
    link: null,
    createdAt: new Date("2026-09-18T16:20:00"),
    updatedAt: new Date("2026-09-18T16:20:00"),
    category: {
      id: "projects",
      name: "Projects",
      color: "#7C6F64",
    },
  },
  {
    id: "5",
    userId: "user-1",
    categoryId: "learning",
    title: "Completed accessibility training",
    date: "2026-09-17",
    impact: null,
    notes:
      "Finished the advanced accessibility module and documented the key takeaways.",
    link: null,
    createdAt: new Date("2026-09-17T10:08:00"),
    updatedAt: new Date("2026-09-17T10:08:00"),
    category: {
      id: "learning",
      name: "Learning",
      color: "#f512a0",
    },
  },
  {
    id: "6",
    userId: "user-1",
    categoryId: "learning",
    title: "Documented deployment process",
    date: "2026-09-16",
    impact: null,
    notes: "Created a single, calm reference for shipping safely on Fridays.",
    link: null,
    createdAt: new Date("2026-09-16T15:40:00"),
    updatedAt: new Date("2026-09-16T15:40:00"),
    category: {
      id: "learning",
      name: "Learning",
      color: "#7A7185",
    },
  },
  {
    id: "7",
    userId: "user-1",
    categoryId: "wins",
    title: "Resolved recurring customer issue",
    date: "2026-09-15",
    impact: "The support thread has stayed quiet since.",
    notes:
      "Found the underlying cause and shipped a fix instead of another workaround.",
    link: null,
    createdAt: new Date("2026-09-15T13:05:00"),
    updatedAt: new Date("2026-09-15T13:05:00"),
    category: {
      id: "wins",
      name: "Wins",
      color: "#6F7D68",
    },
  },
  {
    id: "8",
    userId: "user-1",
    categoryId: "projects",
    title: "Prepared quarterly planning materials",
    date: "2026-09-14",
    impact: null,
    notes:
      "Turned a wide set of ideas into a focused plan the team can act on.",
    link: null,
    createdAt: new Date("2026-09-14T17:12:00"),
    updatedAt: new Date("2026-09-14T17:12:00"),
    category: {
      id: "projects",
      name: "Projects",
      color: "#7C6F64",
    },
  },
];

export function JournalPageClient() {
  const [view, setView] = useState<"list" | "grid" | "compact">("list");
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        eyebrow="Make it yours"
        title="Your Work"
        subtitle="Manage your journal entries"
        onMenu={() => {}}
      />

      {/* <Controls
        view={view}
        setView={setView}
        search={search}
        setSearch={setSearch}
      /> */}
      <div>
        {accomplishments.map((accomplishment) => (
          <AccomplishmentRow
            accomplishment={accomplishment}
            key={accomplishment.id}
            compact={view === "compact"}
            onSelect={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
