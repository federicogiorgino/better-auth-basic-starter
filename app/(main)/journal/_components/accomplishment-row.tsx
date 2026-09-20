import { ArrowRight } from "lucide-react";
import { CategoryDot } from "@/components/category-dot";
import { cn } from "@/lib/utils";
import type { AccomplishmentWithCategory } from "@/types/accomplishment";

type AccomplishmentRowProps = {
  accomplishment: AccomplishmentWithCategory;
  onSelect: () => void;
  compact?: boolean;
};

const serifHeadingClass =
  "m-0 mb-3 font-[family-name:var(--serif)] text-[18px] font-normal tracking-[-0.02em]";

export default function AccomplishmentRow({
  accomplishment,
  onSelect,
  compact = false,
}: AccomplishmentRowProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative flex w-full items-center gap-[22px] border-0 border-b bg-transparent py-[19px] pr-3 pl-[18px] text-left transition-[background] duration-200 hover:bg-[#f0eee8] max-[800px]:gap-2.5 max-[800px]:pr-1",
        compact && "py-3",
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          "absolute top-[19px] bottom-[19px] left-0 w-[3px] rounded-[3px]",
          compact && "top-3 bottom-3",
        )}
        style={{
          backgroundColor: accomplishment.category.color,
        }}
      />

      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "mb-[7px] flex items-center gap-[15px] text-[10px] text-[#a09c93]",
            compact && "mb-0",
          )}
        >
          <span className="inline-flex items-center gap-1.5 text-[#706c64]">
            <CategoryDot color={accomplishment.category.color} />
            {accomplishment.category.name}
          </span>

          {!compact && <span>{accomplishment.date}</span>}
        </div>

        <h3 className={cn(serifHeadingClass, compact && "mb-0 text-[14px]")}>
          {accomplishment.title}
        </h3>

        {!compact && (
          <p className="m-0 text-xs leading-[1.55] text-[#77736b] max-[800px]:line-clamp-2">
            {accomplishment.impact ?? accomplishment.notes ?? ""}
          </p>
        )}
      </div>

      <time
        className={cn(
          "self-end text-[11px] text-[#9d988e] max-[800px]:mt-[30px] max-[800px]:self-start",
          compact && "mt-0 ml-auto self-end",
        )}
      >
        {formatTime(accomplishment.createdAt)}
      </time>

      <ArrowRight
        className="text-[#aaa59a] opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-[800px]:hidden"
        size={16}
      />
    </button>
  );
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
