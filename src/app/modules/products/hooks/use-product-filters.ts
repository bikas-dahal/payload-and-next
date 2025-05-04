import {
  useQueryStates,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = ["newest", "oldest", "Trending"] as const;

export const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("newest"),
  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }).withDefault(""),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }).withDefault(""),
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true,
  }).withDefault([]),
};

export const useProductFilter = () => {
  return useQueryStates(params);
};
