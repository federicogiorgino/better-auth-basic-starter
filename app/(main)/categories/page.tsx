// app/categories/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserCategories } from "@/actions/categories";
import { CategoriesPageClient } from "./client";

export default async function CategoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getUserCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesPageClient />
    </HydrationBoundary>
  );
}
