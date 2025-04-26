import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";

interface Props {
    data: any;
}

export const Categories = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {data.map((category: Category) => (
                <div key={category.id}>
                    <CategoryDropdown
                        category={category}
                        isActive={false}
                        isNavigationHovered={false}
                    />
                </div>
            ))}
        </div>
    );
};