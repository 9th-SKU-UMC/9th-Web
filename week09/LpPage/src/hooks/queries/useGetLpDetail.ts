import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key";

export function useGetLpDetail(lpid: number) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpid],
    queryFn: () => getLpDetail(lpid),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
