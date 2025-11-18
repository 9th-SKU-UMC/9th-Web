import { useMutation } from "@tanstack/react-query";
import {
  type RequestSigninDto,
  type ResponseSigninDto,
} from "../../types/auth";
import { postSignin } from "../../apis/auth";

export const useLogin = () => {
  return useMutation<ResponseSigninDto, Error, RequestSigninDto>({
    mutationFn: (body) => postSignin(body),
  });
};
