"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import { CustomCategory } from "../types";
import Link from "next/link";

interface Props {
  category: CustomCategory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const handleMouseEnter = () => {
    if (category.subcategories) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const dropdownPosition = getDropdownPosition();

  const toggleDropdown = () => {
    if (category.subcategories.docs?.length) {
      setIsHovered((prev) => !prev);
    }
  };


  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleDropdown}
    >
      <div className="relative">

        <Button
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive &&
              !isNavigationHovered &&
              "bg-white border-primary shadow-[4px_4px_0_0_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]",
              isHovered && "shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-white border-primary -translate-x-[4px] -translate-y-[4px]"
          )}
          variant={"elevated"}
          
        >
          <Link  prefetch href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-b-black left-1/2 -translate-x-1/2 border-r-transparent  transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
        )}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isHovered}
        position={dropdownPosition}
      />
    </div>
  );
};
