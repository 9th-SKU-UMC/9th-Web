import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { postLike } from "../../apis/lp";

export function usePostLike(lpId: number) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => postLike(lpId),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
      client.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });
}
