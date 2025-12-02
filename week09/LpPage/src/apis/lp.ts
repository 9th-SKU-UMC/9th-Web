import type { PaginationDto } from "../types/common.ts";
import type { ResponseLpListDto } from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  console.log("API 호출 getLpList:", paginationDto);
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return {
    ...data,
    nextCursor: data.nextCursor ?? null,
  };
};

export const getLpDetail = async (lpId: number) => {
  try {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export async function postLike(lpId: number) {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
}

export async function deleteLike(lpId: number) {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
}

export async function createLp() {
  const { data } = await axiosInstance.post("/v1/uploads");
  return data;
}
