import { cn } from "cn";
import {
  Archive,
  CalendarDays,
  ChevronDown,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const filterButtonClass =
  "flex items-center gap-[7px] rounded border bg-transparent px-2.5 py-2 text-[11px] text-[#706d66] max-[800px]:flex-1 max-[800px]:justify-center max-[800px]:[&>span]:truncate";

export function Controls({
  view,
  setView,
  search,
  setSearch,
}: {
  view: string;
  setView: (v: "list" | "grid" | "compact") => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b pt-[38px] pb-4 max-[800px]:flex-wrap max-[800px]:pt-7">
      <label className="flex max-w-[260px] flex-1 items-center gap-2 border-b border-[#cbc7bc] py-[7px] text-[var(--muted)] max-[800px]:max-w-none max-[800px]:basis-full">
        <Search size={15} />
        <input
          className="w-full border-0 bg-transparent text-xs text-[var(--ink)] outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your work"
          aria-label="Search your work"
        />
      </label>
      <button type="button" className={filterButtonClass}>
        <CalendarDays size={15} /> <span>September</span>
        <ChevronDown size={14} />
      </button>
      <button type="button" className={filterButtonClass}>
        <SlidersHorizontal size={15} /> <span>All areas</span>
        <ChevronDown size={14} />
      </button>
      <div className="ml-auto flex items-center gap-0.5 rounded border bg-transparent p-[3px] text-[11px] text-[#706d66] max-[800px]:ml-auto">
        <button
          type="button"
          className={cn(
            "grid place-items-center rounded-[3px] border-0 bg-transparent p-[6px_7px] text-[#9b978f]",
            view === "list" && "bg-[#e7e5df] text-muted-foreground",
          )}
          onClick={() => setView("list")}
          aria-label="List view"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          className={cn(
            "grid place-items-center rounded-[3px] border-0 bg-transparent p-[6px_7px] text-[#9b978f]",
            view === "grid" && "bg-[#e7e5df] text-muted-foreground",
          )}
          onClick={() => setView("grid")}
          aria-label="Grid view"
        >
          <Grid2X2 size={16} />
        </button>
        <button
          type="button"
          className={cn(
            "grid place-items-center rounded-[3px] border-0 bg-transparent p-[6px_7px] text-[#9b978f]",
            view === "compact" && "bg-[#e7e5df] text-muted-foreground",
          )}
          onClick={() => setView("compact")}
          aria-label="Compact view"
        >
          <Archive size={16} />
        </button>
      </div>
    </div>
  );
}
