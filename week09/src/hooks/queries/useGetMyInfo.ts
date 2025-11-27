import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";
import type { ResponseMyInfoDto } from "../../types/auth";

export const useGetMyInfo = (options?: UseQueryOptions<ResponseMyInfoDto>) => {
  return useQuery<ResponseMyInfoDto>({
    queryKey: ["me"],
    queryFn: getMyInfo,
    ...options,
  });
};
