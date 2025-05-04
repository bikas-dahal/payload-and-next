import { Footer } from "@/app/modules/tenants/ui/components/footer";
import {
  Navbar,
  NavbarSkeleton,
} from "@/app/modules/tenants/ui/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}

const Layout = async ({ children, params, searchParams }: Props) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getOne.queryOptions({
      tenantSlug: slug,
      ...searchParams,
    })
  );

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar tenantSlug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 ">
        <div className="max-w-(breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
