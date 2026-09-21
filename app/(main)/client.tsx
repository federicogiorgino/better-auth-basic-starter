"use client";

import { ArrowRight, CheckCircle2, NotebookPen, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { AccomplishmentRow } from "@/components/accomplishment-row";
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
import {
  formatInputDate,
  formatLongDate,
  formatShortMonthDay,
} from "@/utils/date";
import { formatCountLabel } from "@/utils/string";

const todayPreviewLimit = 4;
const recentPreviewLimit = 3;
const categoryPreviewLimit = 4;

export function HomePageClient() {
  const today = formatInputDate(new Date());
  const { openCreate, openEdit } = useAccomplishmentPanelStore();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const { data: todayAccomplishments, isLoading: isLoadingToday } =
    useAccomplishments({
      dateFrom: today,
      dateTo: today,
      page: 1,
      pageSize: todayPreviewLimit,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  const { data: recentAccomplishments, isLoading: isLoadingRecent } =
    useAccomplishments({
      page: 1,
      pageSize: recentPreviewLimit,
      sortBy: "date",
      sortOrder: "desc",
    });

  const todaysRows = useMemo(
    () => todayAccomplishments?.data.map(toAccomplishmentWithCategory) ?? [],
    [todayAccomplishments],
  );
  const recentRows = useMemo(
    () => recentAccomplishments?.data.map(toAccomplishmentWithCategory) ?? [],
    [recentAccomplishments],
  );
  const activeCategories = useMemo(
    () =>
      categories
        .filter((category) => category.accomplishmentCount > 0)
        .toSorted(
          (first, second) =>
            second.accomplishmentCount - first.accomplishmentCount,
        )
        .slice(0, categoryPreviewLimit),
    [categories],
  );
  const maxCategoryCount = Math.max(
    1,
    ...activeCategories.map((category) => category.accomplishmentCount),
  );

  const totalAccomplishments = recentAccomplishments?.pagination.total ?? 0;
  const todayCount = todayAccomplishments?.pagination.total ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        eyebrow={formatLongDate(today)}
        title="Today"
        subtitle="Small notes. Clearer progress."
        onMenu={() => {}}
      />

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        <DashboardStat
          isLoading={isLoadingToday}
          label="Logged today"
          value={todayCount}
        />
        <DashboardStat
          isLoading={isLoadingRecent}
          label="Total accomplishments"
          value={totalAccomplishments}
        />
        <DashboardStat
          isLoading={isLoadingCategories}
          label="Areas of work"
          value={categories.length}
        />
      </div>

      <section className="grid gap-10 border-b py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8 flex items-end justify-between gap-4 max-md:flex-col max-md:items-start">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Start here
              </p>
              <h2 className="font-serif text-4xl leading-tight tracking-tight">
                Today&apos;s entries
              </h2>
            </div>

            <Button type="button" onClick={() => openCreate("drawer")}>
              <Plus data-icon="inline-start" />
              Add work
            </Button>
          </div>

          {isLoadingToday ? (
            <TodaySkeleton />
          ) : todaysRows.length > 0 ? (
            <div>
              {todaysRows.map((accomplishment) => (
                <AccomplishmentRow
                  key={accomplishment.id}
                  accomplishment={accomplishment}
                  onSelect={() =>
                    openEdit(toEditingAccomplishment(accomplishment), "drawer")
                  }
                  showDate={false}
                />
              ))}
            </div>
          ) : (
            <EmptyToday onCreate={() => openCreate("drawer")} />
          )}
        </div>

        <aside className="flex flex-col gap-8">
          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Momentum
            </p>
            <h2 className="mb-6 font-serif text-3xl leading-tight tracking-tight">
              Where work is collecting
            </h2>

            {isLoadingCategories ? (
              <div className="flex flex-col gap-4">
                {["category-one", "category-two", "category-three"].map(
                  (row) => (
                    <Skeleton key={row} className="h-5 w-full" />
                  ),
                )}
              </div>
            ) : activeCategories.length > 0 ? (
              <div className="flex flex-col gap-4">
                {activeCategories.map((category) => (
                  <div key={category.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-sm">
                      <CategoryDot color={category.color} />
                      <span>{category.name}</span>
                      <span className="ml-auto text-muted-foreground tabular-nums">
                        {category.accomplishmentCount}
                      </span>
                    </div>
                    <div className="h-2 bg-muted">
                      <div
                        className="h-full"
                        style={{
                          width: `${(category.accomplishmentCount / maxCategoryCount) * 100}%`,
                          backgroundColor: category.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Add a category and your momentum will show up here.
              </p>
            )}
          </section>

          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Next
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link
                href="/journal"
                className="inline-flex items-center justify-between gap-3 text-foreground transition-colors hover:text-muted-foreground"
              >
                Open the full journal
                <ArrowRight data-icon="inline-end" />
              </Link>
              <Link
                href="/review"
                className="inline-flex items-center justify-between gap-3 text-foreground transition-colors hover:text-muted-foreground"
              >
                Review recent progress
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </section>
        </aside>
      </section>

      <section className="py-10">
        <div className="mb-8 flex items-end justify-between gap-4 max-md:flex-col max-md:items-start">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Recently
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight">
              Last things worth keeping
            </h2>
          </div>

          <Button variant="outline" asChild>
            <Link href="/journal">
              View all
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        {isLoadingRecent ? (
          <TodaySkeleton rows={recentPreviewLimit} />
        ) : recentRows.length > 0 ? (
          <div className="max-w-4xl">
            {recentRows.map((accomplishment) => (
              <AccomplishmentRow
                key={accomplishment.id}
                accomplishment={accomplishment}
                onSelect={() =>
                  openEdit(toEditingAccomplishment(accomplishment), "drawer")
                }
                trailing={formatShortMonthDay(accomplishment.date)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Your recent accomplishments will appear here once you start logging.
          </p>
        )}
      </section>
    </div>
  );
}

function DashboardStat({
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
      <div className="border-b pb-5">
        <Skeleton className="mb-2 h-10 w-16" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  return (
    <div className="border-b pb-5">
      <div className="font-serif text-5xl leading-none tracking-tight">
        {value}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function TodaySkeleton({ rows = todayPreviewLimit }: { rows?: number }) {
  return (
    <div className="flex flex-col">
      {Array.from(
        { length: rows },
        (_, index) => `today-skeleton-${index}`,
      ).map((row) => (
        <div
          key={row}
          className="flex items-center gap-5 border-b py-5 pr-3 pl-4"
        >
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

function EmptyToday({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="border-b py-10">
      <div className="mb-5 flex items-center gap-3 text-muted-foreground">
        <CheckCircle2 />
        <span>{formatCountLabel(0, "entry", "entries")} today</span>
      </div>
      <h3 className="mb-3 font-serif text-2xl leading-tight tracking-tight">
        Nothing logged yet.
      </h3>
      <p className="mb-6 max-w-xl text-muted-foreground">
        Capture one useful thing before the day gets away from you.
      </p>
      <Button type="button" variant="outline" onClick={onCreate}>
        <NotebookPen data-icon="inline-start" />
        Write the first one
      </Button>
    </div>
  );
}
