import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/comments";

interface AddReplyProps {
  comment: Comm;
  id: number;
}

export const useAddReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comment, id }: AddReplyProps) => addComment(comment, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
