"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useMemo } from "react";
import { AccomplishmentRow } from "@/components/accomplishment-row";
import { CategoryDot } from "@/components/category-dot";
import { PageHeading } from "@/components/page-heading";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccomplishments } from "@/hooks/use-accomplishments";
import { useCategories } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";
import { useCalendarDayPanelStore } from "@/store/calendar-day-panel-store";
import type { AccomplishmentListItem } from "@/types/accomplishment";
import {
  getAccomplishmentCategoryCounts,
  groupAccomplishmentListItemsByDate,
  toAccomplishmentWithCategory,
  toEditingAccomplishment,
} from "@/utils/accomplishments";
import {
  formatDayHeading,
  formatInputDate,
  formatMonthName,
  formatMonthYear,
  getAdjacentMonth,
  getCalendarGridDates,
  getMonthDate,
  getMonthDateRange,
} from "@/utils/date";
import { formatCountLabel } from "@/utils/string";

const weekdays = [
  { short: "Mon", narrow: "M" },
  { short: "Tue", narrow: "T" },
  { short: "Wed", narrow: "W" },
  { short: "Thu", narrow: "T" },
  { short: "Fri", narrow: "F" },
  { short: "Sat", narrow: "S" },
  { short: "Sun", narrow: "S" },
];
const maxDotsPerDay = 6;

export function CalendarPageClient() {
  const now = new Date();
  const { openEdit } = useAccomplishmentPanelStore();
  const {
    isOpen: isDayPanelOpen,
    mode: dayPanelMode,
    selectedDate,
    open: openDayPanel,
    close: closeDayPanel,
  } = useCalendarDayPanelStore();
  const [params] = useQueryStates({
    year: parseAsInteger.withDefault(now.getFullYear()),
    month: parseAsInteger.withDefault(now.getMonth() + 1),
  });

  const monthDate = getMonthDate(params.year, params.month);
  const previousMonth = getAdjacentMonth(monthDate, -1);
  const nextMonth = getAdjacentMonth(monthDate, 1);
  const monthRange = getMonthDateRange(monthDate);
  const calendarDates = useMemo(
    () => getCalendarGridDates(monthDate),
    [monthDate],
  );

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const { data: accomplishments, isLoading: isLoadingAccomplishments } =
    useAccomplishments({
      dateFrom: monthRange.start,
      dateTo: monthRange.end,
      page: 1,
      pageSize: 100,
      sortBy: "date",
      sortOrder: "asc",
    });

  const accomplishmentsByDate = useMemo(
    () => groupAccomplishmentListItemsByDate(accomplishments?.data ?? []),
    [accomplishments],
  );

  const isLoading = isLoadingCategories || isLoadingAccomplishments;
  const selectedAccomplishments = selectedDate
    ? (accomplishmentsByDate.get(selectedDate) ?? [])
    : [];

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        eyebrow="The archive"
        title="Calendar"
        subtitle="A quiet index of the work you have done."
        onMenu={() => {}}
      />

      <div className="mt-6 flex items-center justify-between gap-4">
        <CalendarMonthLink date={previousMonth} direction="previous" />
        <h2 className="text-center font-serif text-2xl leading-tight tracking-tight">
          {formatMonthYear(monthDate)}
        </h2>
        <CalendarMonthLink date={nextMonth} direction="next" />
      </div>

      <section className="mt-3">
        <div className="grid grid-cols-7 border-t border-l">
          {weekdays.map((weekday) => (
            <div
              key={weekday.short}
              className="border-r border-b px-2.5 py-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase max-md:px-1 max-md:text-center max-md:tracking-normal"
            >
              <span className="max-md:hidden">{weekday.short}</span>
              <span className="hidden max-md:inline">{weekday.narrow}</span>
            </div>
          ))}

          {calendarDates.map((date) => {
            const inputDate = formatInputDate(date);
            const inCurrentMonth = date.getMonth() === monthDate.getMonth();
            const isToday = inputDate === formatInputDate(now);
            const isSelected = inputDate === selectedDate;
            const dayAccomplishments =
              accomplishmentsByDate.get(inputDate) ?? [];
            const categoriesForDay =
              getAccomplishmentCategoryCounts(dayAccomplishments);

            return (
              <button
                key={inputDate}
                type="button"
                className={cn(
                  "flex min-h-20 flex-col justify-between border-r border-b bg-transparent p-2.5 text-left text-muted-foreground transition-colors hover:bg-muted max-md:min-h-16 max-md:p-1.5",
                  !inCurrentMonth && "bg-muted/30 text-muted-foreground/50",
                  isToday && "bg-muted",
                  isSelected &&
                    "bg-muted text-foreground ring-1 ring-inset ring-foreground/20",
                )}
                onClick={() => openDayPanel(inputDate, "drawer")}
                aria-pressed={isSelected}
                aria-label={`${formatCountLabel(
                  dayAccomplishments.length,
                  "accomplishment",
                )} on ${inputDate}`}
              >
                <span
                  className={cn(
                    "inline-grid size-5 place-items-center text-sm leading-none max-md:text-sm",
                    isToday &&
                      "rounded-full bg-foreground text-background max-md:size-5",
                  )}
                >
                  {date.getDate()}
                </span>

                <div className="flex min-h-6 flex-wrap items-end gap-1.5 max-md:min-h-4 max-md:gap-1">
                  {isLoading ? (
                    <Skeleton className="h-2.5 w-10 max-md:w-5" />
                  ) : (
                    categoriesForDay.slice(0, maxDotsPerDay).map((category) => {
                      const dotSize =
                        category.count >= 4
                          ? "size-5 max-md:size-3.5"
                          : category.count === 3
                            ? "size-4 max-md:size-3"
                            : category.count === 2
                              ? "size-3 max-md:size-2.5"
                              : "size-2.5 max-md:size-2";

                      return (
                        <span
                          key={category.categoryId}
                          className={cn("rounded-full", dotSize)}
                          style={{ backgroundColor: category.color }}
                          title={`${category.name}: ${formatCountLabel(
                            category.count,
                            "accomplishment",
                          )}`}
                        />
                      );
                    })
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <Panel
        mode={dayPanelMode}
        open={isDayPanelOpen}
        onOpenChange={(open) => !open && closeDayPanel()}
        title={
          selectedDate ? formatDayHeading(selectedDate) : "Accomplishments"
        }
      >
        {selectedDate && (
          <CalendarDayPanel
            date={selectedDate}
            accomplishments={selectedAccomplishments}
            isLoading={isLoading}
            onEdit={(accomplishment) =>
              openEdit(
                toEditingAccomplishment(
                  toAccomplishmentWithCategory(accomplishment),
                ),
                "drawer",
              )
            }
          />
        )}
      </Panel>

      <div className="flex flex-wrap items-center gap-5 pt-4 text-sm text-muted-foreground max-md:gap-4">
        {isLoadingCategories
          ? ["legend-one", "legend-two", "legend-three"].map((row) => (
              <Skeleton key={row} className="h-4 w-24" />
            ))
          : categories.map((category) => (
              <Link
                key={category.id}
                href={`/journal?categoryId=${encodeURIComponent(category.id)}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <CategoryDot color={category.color} size="lg" />
                <span>{category.name}</span>
              </Link>
            ))}
      </div>
    </div>
  );
}

function CalendarDayPanel({
  date,
  accomplishments,
  isLoading,
  onEdit,
}: {
  date: string;
  accomplishments: AccomplishmentListItem[];
  isLoading: boolean;
  onEdit: (accomplishment: AccomplishmentListItem) => void;
}) {
  const count = formatCountLabel(accomplishments.length, "accomplishment");

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
        {count}
      </p>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {["day-panel-one", "day-panel-two"].map((row) => (
            <Skeleton key={row} className="h-16 w-full" />
          ))}
        </div>
      ) : accomplishments.length > 0 ? (
        <div className="flex flex-col">
          {accomplishments.map((accomplishment) => (
            <AccomplishmentRow
              key={accomplishment.id}
              accomplishment={toAccomplishmentWithCategory(accomplishment)}
              onSelect={() => onEdit(accomplishment)}
              showDate={false}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-6 text-muted-foreground">
          Nothing logged on this day yet.
        </p>
      )}

      <Button className="mt-5 w-full" variant="default" asChild>
        <Link href={`/journal?dateFrom=${date}&dateTo=${date}`}>
          Open in journal
        </Link>
      </Button>
    </div>
  );
}

function CalendarMonthLink({
  date,
  direction,
}: {
  date: Date;
  direction: "previous" | "next";
}) {
  const href = `/calendar?year=${date.getFullYear()}&month=${date.getMonth() + 1}`;
  const label = formatMonthName(date);

  if (direction === "previous") {
    return (
      <Link
        href={href}
        className="inline-flex min-w-20 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground max-md:min-w-0 max-md:text-xs"
      >
        <ArrowLeft size={16} />
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex min-w-20 items-center justify-end gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground max-md:min-w-0 max-md:text-xs"
    >
      {label}
      <ArrowRight size={16} />
    </Link>
  );
}
