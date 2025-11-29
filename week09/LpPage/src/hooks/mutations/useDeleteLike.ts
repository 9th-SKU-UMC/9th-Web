import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteLike } from "../../apis/lp";

export function useDeleteLike(lpId: number) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLike(lpId),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
      client.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });
}
