import { loadProductFilter } from "@/app/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/app/modules/products/ui/views/product-list-view";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ searchParams, params }: Props) {
  const { slug } = await params;
  const filters = await loadProductFilter(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView narrowView={true} tenantSlug={slug} />
    </HydrationBoundary>
  );
}
