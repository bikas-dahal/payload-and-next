"use client";

import { CategoryDropdown } from "./category-dropdown";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { CustomCategory } from "../types";
import { CategoriesGetManyOutput } from "@/app/modules/categories/types";

interface Props {
  data: CategoriesGetManyOutput
}

export const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isNavigationHovered, setIsNavigationHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";
  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calcualteVisibleCount = () => {
      if (!measureRef.current || !containerRef.current || !viewAllRef.current)
        return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth; // 32 is the padding of the container

      const items = Array.from(measureRef.current.children) as HTMLDivElement[];
      let totalWidth = 0;
      let visibleCount = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) break;

        totalWidth += width;
        visibleCount++;

        setVisibleCount(visibleCount);
      }
    };
    const resizeObserver = new ResizeObserver(calcualteVisibleCount);
    resizeObserver.observe(containerRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data.length]);

  return (
    <div className="relative w-full">
      <CategoriesSidebar
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{
          position: "fixed",
          top: -999,
          left: -999,
        }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* visible items */}

      <div
        ref={containerRef}
        onMouseLeave={() => setIsNavigationHovered(false)}
        onMouseEnter={() => setIsNavigationHovered(true)}
        className="flex flex-nowrap items-center"
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isNavigationHovered}
            />
          </div>
        ))}

        <div className="shrink-0" ref={viewAllRef}>
          <Button
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
              isActiveCategoryHidden &&
                !isNavigationHovered &&
                "bg-white border-primary shadow-[4px_4px_0_0_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]"
            )}
            variant={"elevated"}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            View All
            <ListFilterIcon className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
