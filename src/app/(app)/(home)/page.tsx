import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { loadProductFilter } from "@/app/modules/products/search-params";
import { ProductListView } from "@/app/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface CategoryPageProps {
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ searchParams }: CategoryPageProps) => {
  const filters = await loadProductFilter(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
};

export default CategoryPage;
