import { Suspense } from "react";
import { ProductFilters } from "../components/product-filters";
import { ProductSort } from "../components/product-sort";
import { ProductList, ProductListSkeleton } from "../components/product-list";

interface Props {
  category?: string;
}

export const ProductListView = ({ category }: Props) => {
  return (
    <div className="px-4 lg:px-10  py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-y-2 lg:gap-y-0 justify-between items-center">
        <p className="text-2xl font-medium">Curated for you</p>
        <ProductSort />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2 flex flex-col gap-4">
          <div className="border p-2">
            <ProductFilters />
          </div>
        </div>
        <div className="lg:col-span-4 xl:col-span-6 flex flex-col gap-4">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList categorySlug={category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
