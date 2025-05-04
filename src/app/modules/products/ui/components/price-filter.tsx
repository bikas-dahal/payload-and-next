'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface Props {
    maxPrice?: string | null;
    minPrice?: string | null;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    onClear?: () => void;
}

export const formatAsCurrency = (value: string) => {
    const numberValue = (value.replace(/[^0-9.-]+/g, ""));
    const parts = numberValue.split(".");
    const formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    
    if (!formattedValue) return "";

    const numericValue = parseFloat(formattedValue); 
    if (isNaN(numericValue)) return "";

    return numericValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}


export const PriceFilter = ({ maxPrice, minPrice, onMinPriceChange, onMaxPriceChange, onClear }: Props) => {
    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
        onMinPriceChange(value);
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
        onMaxPriceChange(value);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-2">
                <Label className="font-medium text-base">Minimum Price</Label>
                <Input type="text" value={minPrice ? formatAsCurrency(minPrice) : ""} onChange={handleMinPriceChange} placeholder="0" className="w-full" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Label className="font-medium text-base">Maximum Price</Label>
                <Input type="text" value={maxPrice ? formatAsCurrency(maxPrice) : ""} onChange={handleMaxPriceChange} placeholder="0" className="w-full" />
            </div>
        </div>
    )
}