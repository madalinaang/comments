import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment } from "../api/comments";

interface UpdateCommentProps {
  id: number;
  content: string;
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: UpdateCommentProps) =>
      editComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
