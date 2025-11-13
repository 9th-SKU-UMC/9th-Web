import { useInfiniteQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common.ts";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpList({ search, order, limit }: PaginationDto) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, order] as const,
    queryFn: async ({ pageParam }: { pageParam?: number }) =>
      getLpList({
        cursor: pageParam ?? 0,
        search,
        order,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetLpList;
