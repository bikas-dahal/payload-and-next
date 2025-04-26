import { getQueryClient, trpc } from "@/trpc/server";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * Asynchronous React layout component that wraps content with navigation, search filters, and footer.
 *
 * Prefetches category data for React Query hydration and renders nested content within a structured page layout.
 *
 * @param children - The content to be rendered within the layout.
 */
export default async function RootLayout({ children }: Props) {
  
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
