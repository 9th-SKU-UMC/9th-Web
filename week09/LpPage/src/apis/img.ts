import type { CommonResponse } from "../types/common";
import { axiosInstance } from "./axios";

interface ResponseUploadImgDto extends CommonResponse<{ imageUrl: string }> {
  data: { imageUrl: string };
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosInstance.post<ResponseUploadImgDto>(
      "/v1/uploads",
      formData
    );
    return data.data.imageUrl;
  } catch (e) {
    console.error(e);
    throw new Error();
  }
};
