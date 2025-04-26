import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
    category: Category
    isOpen: boolean
    postion?: {
        top: number
        left: number
    }
}

export const SubcategoryMenu = ({ category, isOpen, postion }: Props) => {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
        return null
    }

    const backgroundColor = category.color || "#ffffff"

    return (
        <div
            className="fixed z-100"
            style={{
                top: postion?.top,
                left: postion?.left,
            }}
        >
            <div className="h-3 w-60 " />
            <div style={{
                // backgroundColor
            }} className="w-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-2 -translate-y-2 text-black rounded-md overflow-hidden border">
                <div className="flex flex-col gap-2 p-2">
                    {category.subcategories.map((subcategory: Category) => (
                        <Link href={``} key={subcategory.id}  className="w-full text-left p-4 hover:bg-gray-200 flex items-center justify-between underline font-medium transition-colors duration-200">
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}