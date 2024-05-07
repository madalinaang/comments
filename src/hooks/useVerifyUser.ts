import { useMutation } from "@tanstack/react-query";
import { verifyCommentCurrentUser } from "../api/comments";

export const useVerifyUser = () => {
  return useMutation({
    mutationFn: verifyCommentCurrentUser,
  });
};
