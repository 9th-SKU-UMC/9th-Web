import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("탈퇴가 완료되었습니다.");
    },
    onError: () => {
      alert("탈퇴 중 오류가 발생했습니다.");
    },
  });
};
