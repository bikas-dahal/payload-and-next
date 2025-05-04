'use client'

import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useProductFilter } from "../../hooks/use-product-filters"
import { PriceFilter } from "./price-filter"
import { TagsFilter } from "./tags-filter"

interface ProductFilterProps {
    title: string
    className?: string
    children: React.ReactNode
}

export const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const Icon = isOpen ? ChevronDown : ChevronRight


    return (
        <div className={cn("border-b flex flex-col gap-2 p-4", className)}>
            <div onClick={() => setIsOpen((prev) => !prev)} className="mt-2 flex items-center justify-between cursor-pointer">
                <p className="font-medium">
                    {title}
                </p>
                <Icon className="size-5" />
            </div>
            {isOpen && children}
        </div>
    )
}

export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilter()

    const onClear = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            tags: null,
        })
    }

    const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
        if (key === "sort") {
            return false;
        }

        if (Array.isArray(value)) {
            return value.length > 0
        }

        return value !== null && value !== undefined && value !== ''
    }
    )

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="border rounded-md bg-white">
            <div className="p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasAnyFilters && (
                    <button onClick={() => onClear()} className="text-sm text-gray-500 cursor-pointer hover:text-gray-800">
                        Clear All
                    </button>
                )}
            </div>
            <ProductFilter title="Price" className="border-b">
                <div className="flex flex-col gap-2">
                    <PriceFilter 
                        minPrice={filters.minPrice}
                        maxPrice={filters.maxPrice}
                        onMinPriceChange={(value) => onChange("minPrice", value)}
                        onMaxPriceChange={(value) => onChange("maxPrice", value)}
                    /> 
                </div>
            </ProductFilter>
            <ProductFilter title="Tags" className="border-b-0">
                <div className="flex flex-col gap-2">
                    <TagsFilter value={filters.tags} onChange={(value) => onChange("tags", value)} />
                </div>
            </ProductFilter>
        </div>
    )
}