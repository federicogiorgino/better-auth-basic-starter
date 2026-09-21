import { cn } from "cn";
import {
  Archive,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { CategoryDot } from "@/components/category-dot";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-categories";
import type { AccomplishmentQuery } from "@/types/accomplishment";

const filterButtonClass =
  "h-8 w-44 rounded border bg-transparent text-xs text-muted-foreground max-md:flex-1";

type ViewMode = "list" | "grid" | "compact";
type SortValue =
  `${AccomplishmentQuery["sortBy"]}:${AccomplishmentQuery["sortOrder"]}`;

export function Controls({
  view,
  setView,
  search,
  setSearch,
  categoryId,
  setCategoryId,
  sortBy,
  sortOrder,
  setSort,
}: {
  view: ViewMode;
  setView: (value: ViewMode) => void;
  search: string;
  setSearch: (value: string) => void;
  categoryId: string;
  setCategoryId: (value: string) => void;
  sortBy: AccomplishmentQuery["sortBy"];
  sortOrder: AccomplishmentQuery["sortOrder"];
  setSort: (value: SortValue) => void;
}) {
  const { data: categories = [], isLoading } = useCategories();
  const sortValue = `${sortBy}:${sortOrder}` as SortValue;

  return (
    <div className="flex items-center gap-2 border-b pt-9.5 pb-4 max-md:flex-wrap max-md:pt-7">
      <label className="flex max-w-64 flex-1 items-center gap-2 border-b border-border py-2 text-muted-foreground max-md:max-w-none max-md:basis-full">
        <Search size={15} />
        <input
          className="w-full border-0 bg-transparent text-xs outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your work"
          aria-label="Search your work"
        />
      </label>

      <Select
        value={sortValue}
        onValueChange={(value) => setSort(value as SortValue)}
      >
        <SelectTrigger className={filterButtonClass} aria-label="Sort work">
          <SlidersHorizontal size={15} />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date:desc">Newest date</SelectItem>
          <SelectItem value="date:asc">Oldest date</SelectItem>
          <SelectItem value="createdAt:desc">Recently added</SelectItem>
          <SelectItem value="createdAt:asc">First added</SelectItem>
          <SelectItem value="title:asc">Title A-Z</SelectItem>
          <SelectItem value="title:desc">Title Z-A</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={categoryId || "all"}
        onValueChange={(value) => setCategoryId(value === "all" ? "" : value)}
        disabled={isLoading}
      >
        <SelectTrigger
          className={filterButtonClass}
          aria-label="Filter by category"
        >
          <SelectValue
            placeholder={isLoading ? "Loading..." : "All categories"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <CategoryDot color={category.color} size="sm" />
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="ml-auto flex items-center gap-0.5 rounded border bg-transparent p-1 text-xs text-muted-foreground max-md:ml-auto">
        <button
          type="button"
          className={cn(
            "grid place-items-center rounded-sm border-0 bg-transparent px-2 py-1.5 text-muted-foreground",
            view === "list" && "bg-muted text-foreground",
          )}
          onClick={() => setView("list")}
          aria-label="List view"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          className={cn(
            "grid place-items-center rounded-sm border-0 bg-transparent px-2 py-1.5 text-muted-foreground",
            view === "grid" && "bg-muted text-foreground",
          )}
          onClick={() => setView("grid")}
          aria-label="Grid view"
        >
          <Grid2X2 size={16} />
        </button>
        <button
          type="button"
          className={cn(
            "grid place-items-center rounded-sm border-0 bg-transparent px-2 py-1.5 text-muted-foreground",
            view === "compact" && "bg-muted text-foreground",
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
