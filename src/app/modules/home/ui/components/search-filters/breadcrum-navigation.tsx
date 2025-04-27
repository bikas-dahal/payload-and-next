import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

interface BreadcrumbNavigationProps {
    activeCategoryName?: string | null;
    activeCategory?: string | null;
    activeSubcategoryName?: string | null;
}

export const BreadcrumbNavigation = ({ 
    activeCategoryName,
    activeCategory,
    activeSubcategoryName,
}: BreadcrumbNavigationProps) => {

    if (!activeCategoryName || activeCategory === 'all') return null;

    return (
        <Breadcrumb>
        <BreadcrumbList>
            {activeSubcategoryName ? (
                <>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="text-xl font-medium underline text-primary">
                        <Link href={`/${activeCategory}`}>
                            {activeCategoryName}
                        </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-xl font-medium text-primary">/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-xl font-medium">
                            {activeSubcategoryName}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            ) : (
                <BreadcrumbItem>
                        <BreadcrumbPage className="text-xl font-medium">
                            {activeCategoryName}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
            )}
        </BreadcrumbList>
        </Breadcrumb>
    );
};




