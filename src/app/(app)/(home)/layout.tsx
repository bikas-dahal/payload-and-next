import { getQueryClient, trpc } from "@/trpc/server";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
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
