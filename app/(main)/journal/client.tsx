"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  parseAsInteger,
  parseAsNumberLiteral,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import { useEffect, useMemo } from "react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccomplishments } from "@/hooks/use-accomplishments";
import { useCategories } from "@/hooks/use-categories";
import { useAccomplishmentPanelStore } from "@/store/accomplishments-panel-store";
import type { AccomplishmentQuery } from "@/types/accomplishment";
import {
  groupAccomplishmentsByDate,
  toAccomplishmentWithCategory,
  toEditingAccomplishment,
} from "@/utils/accomplishments";
import { formatMonthYear } from "@/utils/date";
import { parseNumber } from "@/utils/numbers";
import {
  getDisplayPageCount,
  getPaginationRange,
  getPreviousPage,
  PAGE_SIZE_VALUES,
} from "@/utils/pagination";
import { formatCountLabel } from "@/utils/string";
import {
  AccomplishmentRow,
  AccomplishmentRowSkeleton,
} from "./_components/accomplishment-row";
import { Controls } from "./_components/controls";

const loadingRows = ["loading-1", "loading-2", "loading-3", "loading-4"];
const sortByValues = ["date", "createdAt", "title"] as const;
const sortOrderValues = ["asc", "desc"] as const;
const viewValues = ["list", "grid", "compact"] as const;

export function JournalPageClient() {
  const { openEdit } = useAccomplishmentPanelStore();
  const [params, setParams] = useQueryStates({
    search: parseAsString.withDefault(""),
    categoryId: parseAsString.withDefault(""),
    sortBy: parseAsStringLiteral(sortByValues).withDefault("date"),
    sortOrder: parseAsStringLiteral(sortOrderValues).withDefault("desc"),
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsNumberLiteral(PAGE_SIZE_VALUES).withDefault(8),
    view: parseAsStringLiteral(viewValues).withDefault("list"),
  });

  const query = useMemo<Partial<AccomplishmentQuery>>(
    () => ({
      search: params.search || undefined,
      categoryId: params.categoryId || undefined,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      page: params.page,
      pageSize: params.pageSize,
    }),
    [params],
  );

  const { data, isLoading, isFetching, isError } = useAccomplishments(query);
  const { data: categories = [] } = useCategories();
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 0;
  const currentPage = pagination?.page ?? params.page;
  const paginationRange = pagination
    ? getPaginationRange({
        page: currentPage,
        pageSize: pagination.pageSize,
        total: pagination.total,
      })
    : null;

  const accomplishments = useMemo(
    () => data?.data.map(toAccomplishmentWithCategory) ?? [],
    [data],
  );
  const accomplishmentGroups = useMemo(
    () => groupAccomplishmentsByDate(accomplishments),
    [accomplishments],
  );

  useEffect(() => {
    if (totalPages > 0 && params.page > totalPages) {
      setParams({ page: totalPages });
    }
  }, [params.page, setParams, totalPages]);

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        eyebrow="Make it yours"
        title="Your Work"
        subtitle="Manage your journal entries"
        onMenu={() => {}}
      />

      <div className="mt-[35px] flex gap-2.5 text-xs text-muted-foreground">
        <span>{formatMonthYear(new Date())}</span>
        <span className="text-[#bbb6ab]">·</span>
        <span>
          {formatCountLabel(accomplishments.length, "accomplishment")}
        </span>
        <span className="text-[#bbb6ab]">·</span>
        <span>
          {formatCountLabel(categories.length, "area", "areas")} of work
        </span>
      </div>
      <Controls
        view={params.view}
        setView={(view) => setParams({ view })}
        search={params.search}
        setSearch={(search) => setParams({ search, page: 1 })}
        categoryId={params.categoryId}
        setCategoryId={(categoryId) => setParams({ categoryId, page: 1 })}
        sortBy={params.sortBy}
        sortOrder={params.sortOrder}
        setSort={(value) => {
          const [sortBy, sortOrder] = value.split(":") as [
            AccomplishmentQuery["sortBy"],
            AccomplishmentQuery["sortOrder"],
          ];
          setParams({ sortBy, sortOrder, page: 1 });
        }}
      />

      <div>
        {isError && (
          <p className="border-b py-8 text-sm text-destructive">
            Failed to load accomplishments.
          </p>
        )}

        {isLoading &&
          loadingRows.map((row) => <AccomplishmentRowSkeleton key={row} />)}

        {!isLoading && !isError && accomplishments.length === 0 && (
          <p className="border-b py-8 text-sm text-muted-foreground">
            No accomplishments found.
          </p>
        )}

        {accomplishmentGroups.map((group) => (
          <section key={group.date} className="border-b">
            <h2 className="bg-background py-3 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {group.heading}
            </h2>

            {group.accomplishments.map((accomplishment) => (
              <AccomplishmentRow
                accomplishment={accomplishment}
                key={accomplishment.id}
                compact={params.view === "compact"}
                showDate={false}
                onSelect={() =>
                  openEdit(toEditingAccomplishment(accomplishment), "drawer")
                }
              />
            ))}
          </section>
        ))}
      </div>

      {pagination && pagination.total > 0 && (
        <div className="flex items-center justify-between gap-3 pt-2 text-xs text-muted-foreground max-[640px]:flex-col max-[640px]:items-stretch">
          <div className="flex items-center gap-3 max-[640px]:justify-between">
            {paginationRange && (
              <span>
                Showing {paginationRange.start}-{paginationRange.end} of{" "}
                {pagination.total}
              </span>
            )}

            <div className="flex items-center gap-2">
              <span id="journal-page-size-label">Rows</span>
              <Select
                value={String(params.pageSize)}
                onValueChange={(value) =>
                  setParams({
                    page: 1,
                    pageSize: parseNumber(
                      value,
                    ) as (typeof PAGE_SIZE_VALUES)[number],
                  })
                }
              >
                <SelectTrigger
                  className="h-7 w-18 text-xs"
                  aria-labelledby="journal-page-size-label"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_VALUES.map((pageSize) => (
                    <SelectItem key={pageSize} value={String(pageSize)}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 max-[640px]:justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage <= 1 || isFetching}
              onClick={() => setParams({ page: getPreviousPage(currentPage) })}
            >
              <ChevronLeft size={14} />
              Previous
            </Button>
            <span className="min-w-20 text-center">
              Page {currentPage} of {getDisplayPageCount(totalPages)}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages || isFetching}
              onClick={() => setParams({ page: currentPage + 1 })}
            >
              Next
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
