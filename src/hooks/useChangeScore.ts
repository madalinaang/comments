import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeScore } from "../api/comments";

interface ChangeScoreProps {
  id: number;
  score: number;
}

export const useChangeScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, score }: ChangeScoreProps) => changeScore(id, score),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
