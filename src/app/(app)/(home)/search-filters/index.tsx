'use client';

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";


export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: "#f5f5f5" }}> 
            <SearchInput  />
            <div className="hidden md:block">
                <Categories data={data} />
            </div>
        </div>
    )
}

export const SearchFiltersSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
            <div className="hidden md:block">
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
            </div>
        </div>
    )
}