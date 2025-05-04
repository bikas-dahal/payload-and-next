import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

interface TagsFilterProps {
  value: string[] | null;
  onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: TagsFilterProps) => {

  const trpc = useTRPC();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
        onChange(value.filter((item) => item !== tag));
    } else {
        onChange(value ? [...value, tag] : [tag]);
    }
  }


  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center h-12">
          <Loader2Icon className="animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page?.docs.map((tag) => (
            <div key={tag.id} onClick={() => onClick(tag.name)} className="flex items-center gap-x-2">
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={value?.includes(tag.name) || false}
                onCheckedChange={() => onClick(tag.name)}
                className="h-4 w-4"
              />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="text-sm underline text-gray-500 cursor-pointer hover:text-gray-800"
        >
          Load more
        </button>
      )}
    </div>
  );
};
