'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
/**
 * Returns a React Query client instance, creating a new one per request on the server or reusing a cached instance on the browser.
 *
 * @returns The React Query client for data fetching and caching.
 *
 * @remark On the server, a new client is created for each call to avoid cross-request state sharing. On the browser, a single client instance is cached and reused to prevent unnecessary re-instantiation, especially during React suspensions.
 */
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
/**
 * Returns the base URL for the tRPC API endpoint, adapting to server or client environments.
 *
 * On the client, returns a relative URL (`/api/trpc`). On the server, constructs the URL using the `NEXT_PUBLIC_APP_URL` environment variable.
 *
 * @returns The full tRPC API endpoint URL.
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return process.env.NEXT_PUBLIC_APP_URL
  })();
  return `${base}/api/trpc`;
}
/**
 * Provides tRPC and React Query context to its child components for client-side data fetching and caching.
 *
 * Wraps children with both React Query's {@link QueryClientProvider} and tRPC's {@link TRPCProvider}, ensuring a single instance of each client per environment.
 *
 * @param children - The React elements to receive tRPC and React Query context.
 *
 * @remark
 * The tRPC client is created once per component instance using {@link useState} to prevent loss of client state if React suspends without a suspense boundary.
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          // transformer: superjson, <-- if you use a data transformer
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}