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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.docs.map((product) => (
                <div key={product.id} className="border p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-gray-800 font-bold">${product.price}</p>
                </div>
            ))}
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