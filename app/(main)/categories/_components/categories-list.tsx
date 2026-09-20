import { useCategories } from "@/hooks/use-categories";
import { CategoryRow, CategoryRowSkeleton } from "./category-row";

export function CategoriesList() {
  const { data, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((item) => (
          <CategoryRowSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <p className="text-sm text-muted-foreground">
          You have no categories yet.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <p className="text-sm text-muted-foreground">
          Error loading categories.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.map((category) => (
        <CategoryRow category={category} key={category.id} />
      ))}
    </div>
  );
}
