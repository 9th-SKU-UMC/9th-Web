import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postImg, type RequestPostImgBody } from "../../apis/img";
import { QUERY_KEY } from "../../constants/key";

// 이미지 생성 훅
export default function usePostImg(file: RequestPostImgBody) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postImg,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY.lps, file] }),
  });
}
