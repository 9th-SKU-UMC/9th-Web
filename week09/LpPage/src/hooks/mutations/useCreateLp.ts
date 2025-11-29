import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { QUERY_KEY } from "../../constants/key";

interface CreateLpDto {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export const useCreateLp = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLpDto) => axiosInstance.post("/v1/lps", data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });
};
