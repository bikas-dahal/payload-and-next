"use client";

import { useTRPC } from "@/trpc/client";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useProductFilter } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

interface ProductListProps {
  categorySlug?: string;
}

export const ProductList = ({ categorySlug }: ProductListProps) => {
  const [filters] = useProductFilter();

  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          categorySlug,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );
  console.log("data", data);

  if (data.pages[0].docs.length === 0) {
    return (
      <div className="flex border border-black border-dashed rounded-lg bg-white flex-col items-center justify-center h-full">
        <InboxIcon className="size-10" />
        <p className="text-lg font-medium">No products found</p>
      </div>
    );
  }

  return (
  <>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {data?.pages
        .flatMap((page) => page.docs)
        .map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.image?.url ?? ""}
            authorUsername={"hari"}
            authorImageUrl={undefined}
            reviewRating={4}
            reviewCount={10}
            price={product.price}
          />
        ))}
    </div>
    <div className="flex justify-center mt-4">
      {hasNextPage && (
        <Button
        variant={'elevated'}
          className="bg-white text-white px-4 py-2 rounded disabled:bg-gray-200 disabled:text-gray-500"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}

    </div>
  </>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
            <div
            key={index}
            className="w-full h-64 bg-gray-200 rounded-md shadow-sm"
            >
                <ProductCardSkeleton />
            </div>
        ))}
      </div>
    );
};
