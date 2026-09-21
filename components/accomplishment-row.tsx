import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { CategoryDot } from "@/components/category-dot";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { AccomplishmentWithCategory } from "@/types/accomplishment";
import { formatTime } from "@/utils/date";

type AccomplishmentRowProps = {
  accomplishment: AccomplishmentWithCategory;
  onSelect?: () => void;
  compact?: boolean;
  showDate?: boolean;
  trailing?: ReactNode;
};

const serifHeadingClass = "m-0 font-serif text-lg tracking-tight";

export function AccomplishmentRow({
  accomplishment,
  onSelect,
  compact = false,
  showDate = true,
  trailing,
}: AccomplishmentRowProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative flex w-full items-center gap-5 border-0 border-b bg-transparent py-5 pr-3 pl-4 text-left transition-colors duration-200 hover:bg-muted max-md:gap-2.5 max-md:pr-1",
        compact && "py-3",
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          "absolute top-5 bottom-5 left-0 w-1 rounded-sm",
          compact && "top-3 bottom-3",
        )}
        style={{
          backgroundColor: accomplishment.category.color,
        }}
      />

      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "mb-2 flex items-center gap-4 text-xs text-muted-foreground",
            compact && "mb-0",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <CategoryDot color={accomplishment.category.color} />
            {accomplishment.category.name}
          </span>

          {!compact && showDate && <span>{accomplishment.date}</span>}
        </div>

        <h3 className={cn(serifHeadingClass, compact && "mb-0 text-sm")}>
          {accomplishment.title}
        </h3>

        {!compact && (
          <p className="m-0 text-xs leading-6 text-muted-foreground max-md:line-clamp-2">
            {accomplishment.impact ?? accomplishment.notes ?? ""}
          </p>
        )}
      </div>

      <span
        className={cn(
          "self-end text-xs text-muted-foreground max-md:mt-8 max-md:self-start",
          compact && "mt-0 ml-auto self-end",
        )}
      >
        {trailing ?? formatTime(accomplishment.createdAt)}
      </span>

      <ArrowRight
        className="text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-md:hidden"
        size={16}
      />
    </button>
  );
}

export function AccomplishmentRowSkeleton({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center gap-5 border-0 border-b py-5 pr-3 pl-4 max-md:gap-2.5 max-md:pr-1",
        compact && "py-3",
      )}
    >
      <span
        className={cn(
          "absolute top-5 bottom-5 left-0 w-1 rounded-sm bg-muted",
          compact && "top-3 bottom-3",
        )}
      />

      <div className="min-w-0 flex-1">
        <div className={cn("mb-2 flex items-center gap-4", compact && "mb-0")}>
          <span className="inline-flex items-center gap-1.5">
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
            <Skeleton className="h-2.5 w-16" />
          </span>

          {!compact && <Skeleton className="h-2.5 w-12" />}
        </div>

        <Skeleton
          className={cn("mb-3 h-4 w-3/5", compact && "mb-0 h-3.5 w-2/5")}
        />

        {!compact && (
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-full max-w-md" />
            <Skeleton className="h-3 w-2/5 max-w-56 max-md:hidden" />
          </div>
        )}
      </div>

      <Skeleton
        className={cn("h-3 w-10 self-end", compact && "ml-auto self-end")}
      />

      <div className="w-4 max-md:hidden" />
    </div>
  );
}
