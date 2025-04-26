import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import superjson from 'superjson';
/**
 * Creates and returns a new {@link QueryClient} instance with custom default options.
 *
 * The client is configured with a 30-second query stale time and a custom dehydration strategy that also includes queries with a `'pending'` status.
 *
 * @returns A configured {@link QueryClient} instance.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}