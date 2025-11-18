import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyInfo,
  });
};
