'use client'

import { Button } from "@/components/ui/button";
import { useProductFilter } from "../../hooks/use-product-filters";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilter();

  return (
    <div className="flex items-center gap-2">
      <Button
        size={"sm"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "newest" &&
            "border border-gray-300 text-gray-500 hover:text-gray-800"
        )}
        variant={"secondary"}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            sort: "newest",
          }))
        }
      >
        Newest
      </Button>
      <Button
        size={"sm"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "oldest" &&
            "border border-gray-300 text-gray-500 hover:text-gray-800"
        )}
        variant={"secondary"}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            sort: "oldest",
          }))
        }
      >
        Oldest
      </Button>
      <Button
        size={"sm"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "Trending" &&
            "border border-gray-300 text-gray-500 hover:text-gray-800"
        )}
        variant={"secondary"}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            sort: "Trending",
          }))
        }
      >
        Trending
      </Button>
    </div>
  );
};
