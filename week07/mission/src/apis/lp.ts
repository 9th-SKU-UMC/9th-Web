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

export async function postLike(lpId: number) {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
}

export async function deleteLike(lpId: number) {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
}

export const createLp = (formData: FormData) => {
  return axiosInstance.post("/v1/lps", formData);
};
