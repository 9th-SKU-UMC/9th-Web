import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth";
import type { ResponseMyInfoDto } from "../../types/auth";

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyInfo,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });

      const prev = queryClient.getQueryData<ResponseMyInfoDto>(["myInfo"]);

      queryClient.setQueryData<ResponseMyInfoDto>(["myInfo"], (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          data: {
            ...old.data,
            name: newData.name ?? old.data.name,
            bio: newData.bio ?? old.data.bio,
            avatar: newData.avatar ?? old.data.avatar,
          },
        };
      });

      return { prev };
    },

    onError: (error, variables, context) => {
      console.log(error);
      console.log(variables);

      if (context?.prev) {
        queryClient.setQueryData(["myInfo"], context.prev);
      }
      alert("수정에 실패했습니다.");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};
