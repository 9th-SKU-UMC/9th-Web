import type { PaginationDto } from "../types/common.ts";
import type { ResponseLpListDto } from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return {
    ...data,
    nextCursor: data.nextCursor ?? null,
  };
};

export const getLpDetail = async (id: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};
