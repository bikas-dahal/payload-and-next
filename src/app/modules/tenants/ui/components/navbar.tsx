"use client";

import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface Props {
  tenantSlug: string;
}

export const Navbar = ({ tenantSlug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({ slug: tenantSlug })
  );
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center justify-between px-4 lg:px-10">
        <Link
          href={generateTenantUrl(tenantSlug)}
          className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image.url}
              alt={data.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <p className="text-2xl font-medium text-gray-800">{data.name}</p>
        </Link>
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center justify-between px-4 lg:px-10">
        <p className="text-2xl font-medium text-gray-800">
          <span className="h-6 w-32 bg-gray-200 animate-pulse rounded-md"></span>
        </p>
      </div>
    </nav>
  );
};
