import { ProductList, ProductListSkeleton } from "@/app/modules/products/ui/components/product-list";
import {  getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {

    const { category } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    categorySlug: category,
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
        <ProductList categorySlug={category} />
        </Suspense>
    </HydrationBoundary>
  );
};

export default CategoryPage;
