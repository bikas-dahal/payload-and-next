import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CustomCategory } from "@/app/(app)/(home)/types";

interface CategorySidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({
  isOpen,
  onOpenChange,
}: CategorySidebarProps) => {
  const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

  // Fetch categories with TRPC
  const trpc = useTRPC();
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery(trpc.categories.getMany.queryOptions());

  const currentCategories = parentCategories ?? categories ?? [];
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  };
    
  const handleCategoryClick = (category: CustomCategory) => () => {
    if (category.subcategories && category.subcategories.length > 0) {
      // Here's the fix - we're now setting the actual subcategories array
      setParentCategories(category.subcategories);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || "#f5f5f5";

  if (isLoading) {
    return <div className="p-4">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load categories: {error.message}
      </div>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0"
        style={{
          backgroundColor,
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full cursor-pointer text-left p-4 hover:bg-black hover:text-white flex items-center justify-start underline font-medium transition-colors duration-200"
            >
              <ChevronLeft className="size-4 mr-2" />
              Back
            </button>
          )}
          {Array.isArray(currentCategories) && currentCategories.map((category) => (
            <button
              key={category.slug}
              className="w-full cursor-pointer text-left p-4 hover:bg-black hover:text-white flex items-center justify-between underline font-medium transition-colors duration-200"
              onClick={handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRight className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};