import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/comments";

export const useGetComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
    staleTime: Infinity,
  });
};
