'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

interface ProductListProps {
    categorySlug: string
}


export const ProductList = ({ categorySlug }: ProductListProps ) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({
        categorySlug
    }))
    console.log("data", data);
    

    return ( 
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}

export const ProductListSkeleton = () => {
    return (
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    )
}