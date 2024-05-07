import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/comments";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
