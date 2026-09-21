"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AccomplishmentRow,
  AccomplishmentRowSkeleton,
} from "@/components/accomplishment-row";
import { CategoryDot } from "@/components/category-dot";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccomplishments } from "@/hooks/use-accomplishments";
import { useCategories } from "@/hooks/use-categories";
import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";
import {
  toAccomplishmentWithCategory,
  toEditingAccomplishment,
} from "@/utils/accomplishments";
import { formatShortMonthDay } from "@/utils/date";
import { formatCountLabel } from "@/utils/string";

const recentLimit = 3;
const categorySkeletonRows = [
  "category-skeleton-projects",
  "category-skeleton-meetings",
  "category-skeleton-learning",
  "category-skeleton-wins",
];
const highlightSkeletonRows = [
  "highlight-skeleton-one",
  "highlight-skeleton-two",
  "highlight-skeleton-three",
];

export function ReviewPageClient() {
  const [copied, setCopied] = useState(false);
  const { openEdit } = useAccomplishmentPanelStore();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const { data: accomplishments, isLoading: isLoadingAccomplishments } =
    useAccomplishments({
      page: 1,
      pageSize: 100,
      sortBy: "date",
      sortOrder: "desc",
    });

  const totalAccomplishments = accomplishments?.pagination.total ?? 0;
  const activeCategories = useMemo(
    () =>
      categories
        .filter((category) => category.accomplishmentCount > 0)
        .toSorted(
          (first, second) =>
            second.accomplishmentCount - first.accomplishmentCount,
        ),
    [categories],
  );
  const maxCategoryCount = Math.max(
    1,
    ...activeCategories.map((category) => category.accomplishmentCount),
  );
  const recentHighlights = useMemo(
    () =>
      accomplishments?.data
        .slice(0, recentLimit)
        .map(toAccomplishmentWithCategory) ?? [],
    [accomplishments],
  );

  const summary = useMemo(
    () =>
      [
        `Review`,
        `${formatCountLabel(totalAccomplishments, "accomplishment")}`,
        `${formatCountLabel(categories.length, "area", "areas")} of work`,
        "",
        "Where your energy went",
        ...activeCategories.map(
          (category) =>
            `- ${category.name}: ${formatCountLabel(
              category.accomplishmentCount,
              "accomplishment",
            )}`,
        ),
        "",
        "Recent highlights",
        ...recentHighlights.map(
          (item) =>
            `- ${item.title} (${formatShortMonthDay(item.date)}): ${
              item.impact || item.notes || "No notes yet."
            }`,
        ),
      ].join("\n"),
    [
      activeCategories,
      categories.length,
      recentHighlights,
      totalAccomplishments,
    ],
  );

  async function handleCopySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const isLoading = isLoadingCategories || isLoadingAccomplishments;

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        eyebrow="Look back"
        title="Review"
        subtitle="Turn your work into a story."
        onMenu={() => {}}
      />

      <div className="mt-9 flex items-end justify-between gap-6 border-b pb-10 max-md:flex-col max-md:items-start">
        <div className="flex gap-16 max-md:gap-10">
          <ReviewStat
            isLoading={isLoading}
            value={totalAccomplishments}
            label="accomplishments"
          />
          <ReviewStat
            isLoading={isLoading}
            value={categories.length}
            label="areas of work"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleCopySummary}
          disabled={isLoading}
          className="gap-2 text-muted-foreground"
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
          {copied ? "Copied" : "Copy summary"}
        </Button>
      </div>

      <ReviewSection eyebrow="By category" title="Where your energy went">
        {isLoading ? (
          <div className="flex max-w-4xl flex-col gap-5">
            {categorySkeletonRows.map((row) => (
              <div
                key={row}
                className="flex items-center gap-8 max-md:flex-col max-md:items-stretch max-md:gap-2"
              >
                <Skeleton className="h-5 w-40 max-md:w-28" />
                <Skeleton className="h-3 flex-1" />
                <Skeleton className="h-5 w-8" />
              </div>
            ))}
          </div>
        ) : activeCategories.length > 0 ? (
          <div className="flex max-w-4xl flex-col gap-5">
            {activeCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-8 max-md:flex-col max-md:items-stretch max-md:gap-2"
              >
                <div className="flex w-40 items-center gap-3 max-md:w-auto">
                  <CategoryDot color={category.color} size="lg" />
                  <span>{category.name}</span>
                </div>
                <div className="h-3 flex-1 bg-muted">
                  <div
                    className="h-full"
                    style={{
                      width: `${(category.accomplishmentCount / maxCategoryCount) * 100}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <span className="w-8 text-muted-foreground tabular-nums max-md:w-auto">
                  {category.accomplishmentCount}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Add a few accomplishments to see where your energy is going.
          </p>
        )}
      </ReviewSection>

      <ReviewSection
        eyebrow="A few things worth remembering"
        title="Recent highlights"
      >
        {isLoading ? (
          <div className="max-w-4xl">
            {highlightSkeletonRows.map((row) => (
              <AccomplishmentRowSkeleton key={row} />
            ))}
          </div>
        ) : recentHighlights.length > 0 ? (
          <div className="max-w-4xl">
            {recentHighlights.map((accomplishment) => (
              <AccomplishmentRow
                key={accomplishment.id}
                accomplishment={accomplishment}
                // onSelect={() =>
                //   openEdit(toEditingAccomplishment(accomplishment), "drawer")
                // }
                showDate={false}
                trailing={formatShortMonthDay(accomplishment.date)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Your recent highlights will appear here once you start logging work.
          </p>
        )}
      </ReviewSection>
    </div>
  );
}

function ReviewStat({
  isLoading,
  value,
  label,
}: {
  isLoading: boolean;
  value: number;
  label: string;
}) {
  if (isLoading) {
    return (
      <div>
        <Skeleton className="mb-2 h-14 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>
    );
  }

  return (
    <div>
      <div className="font-serif text-6xl leading-none tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-muted-foreground">{label}</div>
    </div>
  );
}

function ReviewSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b py-14">
      <p className="mb-6 text-xs font-bold tracking-widest text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="mb-8 font-serif text-4xl leading-tight tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}
