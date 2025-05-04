import { CategoriesGetManyOutput } from "@/app/modules/categories/types";
import Link from "next/link";

interface Props {
    category: CategoriesGetManyOutput[1]
    isOpen: boolean

}

export const SubcategoryMenu = ({ category, isOpen }: Props) => {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
        return null
    }

    const backgroundColor = category.color || "#f5f5f5"

    return (
        <div
            className="absolute z-[100]"
            style={{
                top: "100%",
                left: 0,
            }}
        >
            <div className="h-6 w-60" />
            <div style={{
                backgroundColor
            }} className="w-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-2 -translate-y-2 text-black rounded-md overflow-hidden border">
                <div className="flex flex-col gap-2 p-2">
                    {category.subcategories.map((subcategory) => (
                        <Link href={`/${category.slug}/${subcategory.slug}`} key={subcategory.id}  className="w-full text-left p-4 hover:bg-gray-200 flex items-center justify-between underline font-medium transition-colors duration-200">
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
