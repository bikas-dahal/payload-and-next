"use client";
import { Input } from "@/components/ui/input";
import { ListFilter, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center w-full gap-2">
      <CategoriesSidebar
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-600" />
        <Input
          className="pl-8"
          placeholder="Search Product"
          disabled={disabled}
        />
      </div>
      <Button
        variant={"elevated"}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="size-12 shrink-0 md:hidden"
      >
        <ListFilter className="size-4" />
      </Button>
    </div>
  );
};
