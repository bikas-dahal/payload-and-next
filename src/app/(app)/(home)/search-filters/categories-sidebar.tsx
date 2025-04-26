
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CustomCategory } from "../types";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategorySidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CustomCategory[];
}

export const CategoriesSidebar = ({
  categories,
  isOpen,
  onOpenChange,
}: CategorySidebarProps) => {
  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  // check if we have parent categories

  const currentCategories = parentCategories ?? categories ?? [];
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CustomCategory) => () => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
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

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0"
        style={{
          backgroundColor,
          // backdropFilter: "blur(100px)",
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
          {currentCategories.map((category) => (
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
